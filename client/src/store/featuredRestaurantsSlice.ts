import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// تعريف نوع بيانات المطعم
interface Restaurant {
  id: string;
  name: string;
  cuisineType?: string;
  rating?: number;
  cuisine?: {
    name: string;
  };
}

// تعريف حالة Redux للمطاعم المميزة
interface FeaturedRestaurantsState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

// دالة async لجلب بيانات المطاعم من API
export const fetchFeaturedRestaurants = createAsyncThunk(
  'featuredRestaurants/fetchAll',
  async () => {
    const response = await fetch('http://localhost:8080/api/details/');
    if (!response.ok) {
      throw new Error('فشل في جلب بيانات المطاعم');
    }
    const data = await response.json();
    return data.slice(0, 6); // الحد الأقصى 6 مطاعم للقسم المميز
  }
);

// الحالة الابتدائية
const initialState: FeaturedRestaurantsState = {
  restaurants: [],
  loading: false,
  error: null,
};

// إنشاء Redux slice
const featuredRestaurantsSlice = createSlice({
  name: 'featuredRestaurants',
  initialState,
  reducers: {
    // يمكن إضافة reducers إضافية هنا إذا لزم الأمر
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
        state.error = null;
      })
      .addCase(fetchFeaturedRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'حدث خطأ أثناء جلب البيانات';
      });
  },
});

export const { clearError } = featuredRestaurantsSlice.actions;
export default featuredRestaurantsSlice.reducer; 