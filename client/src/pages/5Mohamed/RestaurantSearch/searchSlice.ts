import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ViewMode = 'grid' | 'list';

export interface SearchFilters {
  cuisineType: string;
  openNow: boolean;
  rating: number | '';
}

export interface SearchState {
  view: ViewMode;
  results: any[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
}

const initialState: SearchState = {
  view: 'grid',
  results: [],
  searchQuery: '',
  loading: false,
  error: null,
  filters: {
    cuisineType: '',
    openNow: false,
    rating: '',
  },
};

const searchSlice = createSlice({
  name: 'restaurantSearchLocal',
  initialState,
  reducers: {
    setView(state, action: PayloadAction<ViewMode>) {
      state.view = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<SearchFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setResults(state, action: PayloadAction<any[]>) {
      state.results = action.payload || [];
    },
    clearResults(state) {
      state.results = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setView,
  setSearchQuery,
  setFilters,
  setResults,
  clearResults,
  setLoading,
  setError,
} = searchSlice.actions;

export default searchSlice.reducer;

