import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RestaurantState } from '../types/propsTypes';

export const fetchRestaurantById = createAsyncThunk(
  'restaurant/fetchById',

  async (restId: string) => {
    const res = await fetch(`http://localhost:8080/api/details/${restId}`);
    if (!res.ok) throw new Error('Failed to fetch restaurant');
    return await res.json();
  }
)

const initialState: RestaurantState = {
  data: null,
  loading: false,
  error: null,
}


const restaurantSlice = createSlice({
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
      });
  },
});

export default restaurantSlice.reducer