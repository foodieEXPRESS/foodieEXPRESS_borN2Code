import { createAsyncThunk, createSlice,  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';  
import axios from 'axios';

import type { FetchOrderHistoryResponse } from '../types/mc_Types'; 
import type { OrderHistoryState } from '../types/mc_Types'; 

export const fetchOrderHistory = createAsyncThunk<
  FetchOrderHistoryResponse,
  void,
  { rejectValue: string }
>(
  'orderHistory/fetchOrderHistory',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/details/OrderH`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      console.log('Slice: API response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Slice: API error:', error);
      return thunkAPI.rejectWithValue(error.response?.data?.error ?? 'Failed to fetch order history');
    }
  }
);


const initialState: OrderHistoryState = {
  records: [],
  loading: false,
  error: null,
  totalOrders: 0,
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
  },

  
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        console.log('Slice: Pending state');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action: PayloadAction<FetchOrderHistoryResponse>) => {
        console.log('Slice: Fulfilled with data:', action.payload);
        state.loading = false;
        state.records = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        console.log('Slice: Rejected with error:', action.payload);
        state.loading = false;
        state.error = action.payload ?? 'Error fetching order history';
      });
  },
});

export default orderHistorySlice.reducer;
