export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'CUSTOMER' | 'RESTAURANT' | 'DRIVER';
  phoneNumber?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'RESTAURANT' | 'DRIVER';
  phoneNumber?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateProfileData {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
} 