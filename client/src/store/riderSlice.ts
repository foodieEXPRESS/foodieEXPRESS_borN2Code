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
    updateDriver: (state, action: PayloadAction<Partial<Driver>>) => {
      if (state.driver) {
        state.driver = { ...state.driver, ...action.payload };
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
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
  updateDriver, 
  updateUser, 
  clearRiderData 
} = riderSlice.actions;

export default riderSlice.reducer;
