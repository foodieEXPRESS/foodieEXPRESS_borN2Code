import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setError, setDriver, updateDriverAvailability, updateDriverFullName, updateDriverPhoneNumber, updateDriverVehicleInfo } from './riderSlice-am';
import * as riderService from '../services/riderService';
import type { AppDispatch } from './index';

// Fetch driver profile
export const fetchDriverProfile = createAsyncThunk(
  'rider/fetchDriverProfile',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const driver = await riderService.getDriverProfile();
      dispatch(setDriver(driver));
      
      return driver;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch driver profile';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Update driver availability
export const updateAvailability = createAsyncThunk(
  'rider/updateAvailability',
  async (isAvailable: boolean, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const driver = await riderService.updateDriverAvailability(isAvailable);
      dispatch(updateDriverAvailability(isAvailable));
      
      return driver;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update availability';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Update driver full name
export const updateFullName = createAsyncThunk(
  'rider/updateFullName',
  async (fullName: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const driver = await riderService.updateDriverFullName(fullName);
      dispatch(updateDriverFullName(fullName));
      
      return driver;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update full name';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Update driver phone number
export const updatePhoneNumber = createAsyncThunk(
  'rider/updatePhoneNumber',
  async (phoneNumber: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const driver = await riderService.updateDriverPhoneNumber(phoneNumber);
      dispatch(updateDriverPhoneNumber(phoneNumber));
      
      return driver;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update phone number';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Update driver vehicle info
export const updateVehicleInfo = createAsyncThunk(
  'rider/updateVehicleInfo',
  async (vehicleInfo: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const driver = await riderService.updateDriverVehicleInfo(vehicleInfo);
      dispatch(updateDriverVehicleInfo(vehicleInfo));
      
      return driver;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update vehicle info';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
