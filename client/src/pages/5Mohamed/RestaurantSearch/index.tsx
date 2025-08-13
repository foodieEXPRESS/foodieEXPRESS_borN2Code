import { useEffect, useRef } from "react";
import NavBar from "../LandingPage/Navbar";
import Hero from "./Hero";
import SearchControls from "./SearchControls";
import Filters from "./Filters";
import ResultsHeader from "./ResultsHeader";
import api from "../../../services/api";
import RestaurantResults from "./RestaurantResults";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { localStore, type LocalRootState } from './localStore';
import { setView, setSearchQuery, setFilters, setResults, setLoading, setError } from './searchSlice';

function SearchAppInner() {
  const dispatch = useDispatch();
  const view = useSelector((s: LocalRootState) => s.restaurantSearchLocal.view);
  const results = useSelector((s: LocalRootState) => s.restaurantSearchLocal.results);
  const searchQuery = useSelector((s: LocalRootState) => s.restaurantSearchLocal.searchQuery);
  const loading = useSelector((s: LocalRootState) => s.restaurantSearchLocal.loading);
  const error = useSelector((s: LocalRootState) => s.restaurantSearchLocal.error);
  const filters = useSelector((s: LocalRootState) => s.restaurantSearchLocal.filters);
  const abortRef = useRef<AbortController | null>(null);
  const handleSearchQueryChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleFiltersChange = (newFilters: any) => {
    dispatch(setFilters(newFilters));
  };

  // Fetch restaurants from database based on search query and filters
  const fetchRestaurants = async (query: string, currentFilters: any) => {
    const q = query.trim();
    
    // Only search if query is at least 2 characters
    if (q.length < 2) {
      dispatch(setResults([]));
      return;
    }

    // Cancel previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const params: any = {};
      if (q.length >= 2) params.query = q;
      if (currentFilters.cuisineType) params.cuisine = currentFilters.cuisineType;
      if (typeof currentFilters.rating === 'number') params.rating = currentFilters.rating;
      if (currentFilters.openNow) {
        params.openNow = true;
        params.now = new Date().toISOString();
        params.tzOffset = new Date().getTimezoneOffset();
      }

      const response = await api.get('/search', { params, signal: controller.signal });
      
      const { data } = response;
      
      if (data.success) {
        const processedResults = data.data?.map((restaurant: any) => ({
          ...restaurant,
          image: restaurant.image || getPlaceholderImage(restaurant.cuisine?.name || 'restaurant'),
          cuisine: restaurant.cuisine?.name || 'Unknown',
          rating: restaurant.rating ?? 0
        })) || [];
        dispatch(setResults(processedResults));
      } else {
        dispatch(setResults([]));
        dispatch(setError('Failed to fetch restaurants'));
      }
    } catch (err: any) {
      if (err?.name === 'CanceledError') return;
      dispatch(setResults([]));
      dispatch(setError('An error occurred while searching. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getPlaceholderImage = (cuisineType: string) => {
    const cuisineImages: { [key: string]: string } = {
      'Italian': '🍕',
      'Japanese': '🍣',
      'American': '🍔',
      'Mexican': '🌮',
      'Indian': '🍛',
      'Chinese': '🍜',
      'Thai': '🍜',
      'Mediterranean': '🥗',
      'French': '🥐',
      'Greek': '🥙',
      'restaurant': '🍽️'
    };
    
    return cuisineImages[cuisineType] || cuisineImages['restaurant'];
  };

  useEffect(() => {
    const q = searchQuery.trim();
    const timeoutId = setTimeout(() => {
      fetchRestaurants(q, filters);
    }, 350);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <Hero />
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <SearchControls onSearch={handleSearchQueryChange} />
            <Filters onFiltersChange={handleFiltersChange} />
          </div>
        </div>
      </div>
      <div className="py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <ResultsHeader resultsCount={results.length} view={view} onChange={(v) => dispatch(setView(v))} />
          {error ? (
            <div className="mt-4 text-sm text-red-600">{error}</div>
          ) : null}
          <RestaurantResults results={results} view={view} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default function FoodieExpressApp() {
  return (
    <Provider store={localStore}>
      <SearchAppInner />
    </Provider>
  );
}
