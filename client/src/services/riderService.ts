import axios from 'axios';
import type { Driver } from '../types/dataTypes';

const API_BASE_URL = 'http://localhost:8080/api/rider-profile';

// Get current driver profile
export const getDriverProfile = async (): Promise<Driver> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch driver profile');
  }
};

// Get driver by ID
export const getDriverById = async (id: string): Promise<Driver> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch driver');
  }
};

// Get all drivers
export const getAllDrivers = async (): Promise<Driver[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch drivers');
  }
};

// Update driver availability
export const updateDriverAvailability = async (isAvailable: boolean): Promise<Driver> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/me/availability`, {
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
    const response = await axios.put(`${API_BASE_URL}/me/fullname`, {
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
    const response = await axios.put(`${API_BASE_URL}/me/phonenumber`, {
      phoneNumber
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update driver phone number');
  }
};
