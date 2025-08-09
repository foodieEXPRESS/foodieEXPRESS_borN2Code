import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { 
  LoginCredentials, 
  RegisterData, 
  ChangePasswordData,
  ApiResponse,
  AuthResponse,
} from '../types/auth';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = await api.post('/auth/register', data);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = await api.post('/auth/login', credentials);
    return response.data;
  },
  // Change password
  changePassword: async (data: ChangePasswordData): Promise<ApiResponse<null>> => {
    const response: AxiosResponse<ApiResponse<null>> = await api.put('/auth/change-password', data);
    return response.data;
  },
};

// Utility function to handle API errors
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export default api; 