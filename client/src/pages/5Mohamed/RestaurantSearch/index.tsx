import { useEffect, useRef, useState } from "react";
import NavBar from "../LandingPage/Navbar";
import Hero from "./Hero";
import SearchControls from "./SearchControls";
import Filters from "./Filters";
import ResultsHeader from "./ResultsHeader";
import api from "../../../services/api";
import RestaurantResults from "./RestaurantResults";

export default function FoodieExpressApp() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [results, setResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({});
  const abortRef = useRef<AbortController | null>(null);
console.log(results ,"data is here")
  const handleSearchQueryChange = (query: string) => {
    console.log('🔍 Search query changed:', query);
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters: any) => {
    console.log('🔍 Filters changed:', newFilters);
    setFilters(newFilters);
  };

  // Fetch restaurants from database based on search query and filters
  const fetchRestaurants = async (query: string, currentFilters: any) => {
    const q = query.trim();
    console.log('🔍 Fetching restaurants for query:', q, 'with filters:', currentFilters);
    
    // Only search if query is at least 2 characters
    if (q.length < 2) {
      console.log('🔍 Query too short, clearing results');
      setResults([]);
      return;
    }

    // Cancel previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    
    try {
      const params: any = {};
      if (q.length >= 2) params.query = q;
      if (currentFilters.cuisineType) params.cuisine = currentFilters.cuisineType;

      console.log('🔍 API call params:', params);
      const response = await api.get('/search', { params, signal: controller.signal });
      console.log('🔍 API response:', response);
      
      const { data } = response;
      console.log('🔍 Response data:', data);
      
      if (data.success) {
        console.log('🔍 Raw results from API:', data.data);
        // Process results to add placeholder images if no real images
        const processedResults = data.data?.map((restaurant: any) => ({
          ...restaurant,
          // Use placeholder image if no real image exists
          image: restaurant.image || getPlaceholderImage(restaurant.cuisine?.name || 'restaurant'),
          // Ensure all required fields exist
          cuisine: restaurant.cuisine?.name || 'Unknown',
          rating: restaurant.rating || 0,
          deliveryTime: restaurant.deliveryTime || '30-45 min',
          price: restaurant.price || '$$'
        })) || [];
        
        console.log('🔍 Processed results:', processedResults);
        setResults(processedResults);
      } else {
        console.log('🔍 API returned success: false');
        setResults([]);
        setError('Failed to fetch restaurants');
      }
    } catch (err: any) {
      if (err?.name === 'CanceledError') return;
      console.error('❌ Search error:', err);
      setResults([]);
      setError('حدث خطأ أثناء البحث. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  // Get placeholder image based on cuisine type
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
    console.log('🔍 useEffect triggered with query:', q);
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

      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <Hero />

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <SearchControls onSearch={handleSearchQueryChange} />
            <Filters onFiltersChange={handleFiltersChange} />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <ResultsHeader resultsCount={results.length} view={view} onChange={setView} />
          {error ? (
            <div className="mt-4 text-sm text-red-600">{error}</div>
          ) : null}
          <RestaurantResults results={results} view={view} loading={loading} />
        </div>
      </div>
    </div>
  );
}
