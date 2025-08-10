import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Types for order tracking data
export interface CustomerData {
  id: string;
  fullName: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface RestaurantData {
  id: string;
  name: string;
  contactPhone: string;
  latitude: number;
  longitude: number;
  cuisine?: {
    id: string;
    name: string;
  };
}

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
  menu: {
    id: string;
    name: string;
    description?: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      description?: string;
    }>;
    referencePrice: number;
  };
}

export interface OrderItemsData {
  orderId: string;
  items: OrderItem[];
  totalItems: number;
  orderTotal: number;
}

export interface OrderTrackingState {
  customerData: CustomerData | null;
  restaurantData: RestaurantData | null;
  orderItemsData: OrderItemsData | null;
  customerLoading: boolean;
  restaurantLoading: boolean;
  orderItemsLoading: boolean;
  customerError: string | null;
  restaurantError: string | null;
  orderItemsError: string | null;
}

const initialState: OrderTrackingState = {
  customerData: null,
  restaurantData: null,
  orderItemsData: null,
  customerLoading: false,
  restaurantLoading: false,
  orderItemsLoading: false,
  customerError: null,
  restaurantError: null,
  orderItemsError: null,
};

// Async thunk for fetching customer data
export const fetchCustomerData = createAsyncThunk(
  'orderTracking/fetchCustomerData',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`http://localhost:8080/api/order-tracking/order/${orderId}/customer`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return result.data.customer;
      } else {
        throw new Error(result.message || 'Failed to fetch customer data');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch customer data');
    }
  }
);

// Async thunk for fetching restaurant data
export const fetchRestaurantData = createAsyncThunk(
  'orderTracking/fetchRestaurantData',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`http://localhost:8080/api/order-tracking/order/${orderId}/restaurant`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return result.data.restaurant;
      } else {
        throw new Error(result.message || 'Failed to fetch restaurant data');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch restaurant data');
    }
  }
);

// Async thunk for fetching order items data
export const fetchOrderItemsData = createAsyncThunk(
  'orderTracking/fetchOrderItemsData',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`http://localhost:8080/api/order-tracking/order/${orderId}/items`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to fetch order items data');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch order items data');
    }
  }
);

const orderTrackingSlice = createSlice({
  name: 'orderTracking',
  initialState,
  reducers: {
    clearCustomerData: (state) => {
      state.customerData = null;
      state.customerError = null;
    },
    clearRestaurantData: (state) => {
      state.restaurantData = null;
      state.restaurantError = null;
    },
    clearOrderItemsData: (state) => {
      state.orderItemsData = null;
      state.orderItemsError = null;
    },
    clearAllData: (state) => {
      state.customerData = null;
      state.restaurantData = null;
      state.orderItemsData = null;
      state.customerError = null;
      state.restaurantError = null;
      state.orderItemsError = null;
    },
  },
  extraReducers: (builder) => {
    // Customer data cases
    builder
      .addCase(fetchCustomerData.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })
      .addCase(fetchCustomerData.fulfilled, (state, action) => {
        state.customerLoading = false;
        state.customerData = action.payload;
        state.customerError = null;
      })
      .addCase(fetchCustomerData.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = action.payload as string;
      });

    // Restaurant data cases
    builder
      .addCase(fetchRestaurantData.pending, (state) => {
        state.restaurantLoading = true;
        state.restaurantError = null;
      })
      .addCase(fetchRestaurantData.fulfilled, (state, action) => {
        state.restaurantLoading = false;
        state.restaurantData = action.payload;
        state.restaurantError = null;
      })
      .addCase(fetchRestaurantData.rejected, (state, action) => {
        state.restaurantLoading = false;
        state.restaurantError = action.payload as string;
      });

    // Order items data cases
    builder
      .addCase(fetchOrderItemsData.pending, (state) => {
        state.orderItemsLoading = true;
        state.orderItemsError = null;
      })
      .addCase(fetchOrderItemsData.fulfilled, (state, action) => {
        state.orderItemsLoading = false;
        state.orderItemsData = action.payload;
        state.orderItemsError = null;
      })
      .addCase(fetchOrderItemsData.rejected, (state, action) => {
        state.orderItemsLoading = false;
        state.orderItemsError = action.payload as string;
      });
  },
});

export const { clearCustomerData, clearRestaurantData, clearOrderItemsData, clearAllData } = orderTrackingSlice.actions;
export default orderTrackingSlice.reducer;
