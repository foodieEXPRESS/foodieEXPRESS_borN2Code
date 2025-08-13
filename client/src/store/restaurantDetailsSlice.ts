import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RestaurantDetailsState } from '../types/mc_Types';
import axios from 'axios';


// mc :Fetch restaurant by ID

export const fetchRestaurantById = createAsyncThunk(
  'restaurant/fetchById',
 async (restId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8080/api/details/${restId}`, {
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        
      });
      if (!res) throw new Error('Failed to fetch restaurant');
      console.log('fetchRestaurantById response:', res.data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// mc: Fetch restaurant image

export const fetchRestaurantImage = createAsyncThunk(
  'restaurant/fetchImage',
   async (restId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8080/api/details/image/${restId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.mediaUrl || null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
);

// mc :Submit or update review

export const submitRestaurantReview = createAsyncThunk(
  'restaurant/submitReview',
  async (
    { restId, rating, comment }: { restId: string; rating: number; comment: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:8080/api/details/review/${restId}`,
        { rating, comment },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      return res.data.review;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const initialState: RestaurantDetailsState = {
  data: null,
  loading: false,
  error: null,
  imageUrl: null,
  reviews: [],
};

const restaurantDetailsSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.reviews = action.payload.reviews || [];
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(fetchRestaurantImage.fulfilled, (state, action) => {
        state.imageUrl = action.payload;
      })   .addCase(submitRestaurantReview.fulfilled, (state, action) => {
        //mc : Add or update review in state
        const existingIndex = state.reviews.findIndex((r) => r.id === action.payload.id);
        if (existingIndex >= 0) {
          state.reviews[existingIndex] = action.payload;
        } else {
          state.reviews.push(action.payload);
        }
      });

  },
});

export default restaurantDetailsSlice.reducer;