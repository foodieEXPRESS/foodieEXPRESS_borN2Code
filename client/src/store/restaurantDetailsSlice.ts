import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RestaurantDetailsState } from '../types/mc_Types';
import axios from 'axios';

export const fetchRestaurantById = createAsyncThunk(
  'restaurant/fetchById',
  async (restId: string) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/details/${restId}`);
      if (!res) throw new Error('Failed to fetch restaurant');
      return await res.data;
    } catch (error) {
      return error;
    }
  }
)

export const fetchRestaurantImage = createAsyncThunk(
  'restaurant/fetchImage',
  async (restId: string) => {
    const res = await axios.get(`http://localhost:8080/api/details/image/${restId}`);
    return res.data.mediaUrl || null;
  }
)

export const initialState: RestaurantDetailsState = {
  data: null,
  loading: false,
  error: null,
  imageUrl: null,
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
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(fetchRestaurantImage.fulfilled, (state, action) => {
        state.imageUrl = action.payload;
      });
  },
});

export default restaurantDetailsSlice.reducer