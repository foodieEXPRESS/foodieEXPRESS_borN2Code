import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Driver, User } from '../types/dataTypes';

interface RiderState {
  driver: Driver | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: RiderState = {
  driver: null,
  user: null,
  loading: false,
  error: null,
};

const riderSlice = createSlice({
  name: 'rider',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setDriver: (state, action: PayloadAction<Driver>) => {
      state.driver = action.payload;
      state.user = action.payload.user || null;
    },
    updateDriverAvailability: (state, action: PayloadAction<boolean>) => {
      if (state.driver) {
        state.driver.isAvailable = action.payload;
      }
    },
    updateDriverFullName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.fullName = action.payload;
      }
    },
    updateDriverPhoneNumber: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.phoneNumber = action.payload;
      }
    },
    clearRiderData: (state) => {
      state.driver = null;
      state.user = null;
      state.error = null;
    },
  },
});

export const { 
  setLoading, 
  setError, 
  setDriver, 
  updateDriverAvailability,
  updateDriverFullName,
  updateDriverPhoneNumber,
  clearRiderData 
} = riderSlice.actions;

export default riderSlice.reducer;
