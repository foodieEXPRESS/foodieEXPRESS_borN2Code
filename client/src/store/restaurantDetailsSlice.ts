import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RestaurantDetailsState } from '../types/mc_Types';
import axios from 'axios';


// mc : refactor to use auth
export const fetchRestaurantById = createAsyncThunk(
  'restaurant/fetchById',
 async (restId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8080/api/details/${restId}`, {
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
      });
      if (!res) throw new Error('Failed to fetch restaurant');
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// mc : refactor to use auth
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