import api from './api';
import type { Driver } from '../types/dataTypes';
const API_BASE_PATH = '/rider-profile';

// Get current driver profile
export const getDriverProfile = async (): Promise<Driver> => {
  try {
    const response = await api.get(`${API_BASE_PATH}/me`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch driver profile');
  }
};

// Get driver by ID
export const getDriverById = async (id: string): Promise<Driver> => {
  try {
    const response = await api.get(`${API_BASE_PATH}/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch driver');
  }
};

// Get all drivers
export const getAllDrivers = async (): Promise<Driver[]> => {
  try {
    const response = await api.get(`${API_BASE_PATH}/`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch drivers');
  }
};

// Update driver availability
export const updateDriverAvailability = async (isAvailable: boolean): Promise<Driver> => {
  try {
    const response = await api.put(`${API_BASE_PATH}/me/availability`, {
      isAvailable
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update driver availability');
  }
};

// Update driver full name
export const updateDriverFullName = async (fullName: string): Promise<Driver> => {
  try {
    const response = await api.put(`${API_BASE_PATH}/me/fullname`, {
      fullName
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update driver full name');
  }
};

// Update driver phone number
export const updateDriverPhoneNumber = async (phoneNumber: string): Promise<Driver> => {
  try {
    const response = await api.put(`${API_BASE_PATH}/me/phonenumber`, {
      phoneNumber
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update driver phone number');
  }
};

// Update driver vehicle info
export const updateDriverVehicleInfo = async (vehicleInfo: string): Promise<Driver> => {
  try {
    const response = await api.put(`${API_BASE_PATH}/me/vehicle`, {
      vehicleInfo
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update driver vehicle info');
  }
};
