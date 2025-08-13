import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import restaurantProfileService from '../services/restaurantProfileService';

// Types (lightweight to keep moving fast)
export type Profile = any;
export type Menu = any;
export type MenuItem = any;
export type Order = any;
export type Dashboard = any;
export type Earnings = any;
export type Review = any;

// Async thunks
export const fetchProfile = createAsyncThunk('restaurant/profile/fetch', async () => {
  return await restaurantProfileService.getProfile();
});

export const saveProfile = createAsyncThunk(
  'restaurant/profile/save',
  async (payload: Partial<Profile>) => {
    return await restaurantProfileService.updateProfile(payload as any);
  }
);

export const fetchDashboard = createAsyncThunk('restaurant/dashboard/fetch', async () => {
  return await restaurantProfileService.getDashboard();
});

export const fetchMenus = createAsyncThunk('restaurant/menus/fetch', async () => {
  return await restaurantProfileService.getMenus();
});

export const createMenu = createAsyncThunk('restaurant/menus/create', async (payload: { name: string; description?: string }) => {
  return await restaurantProfileService.createMenu(payload);
});

export const fetchMenuItems = createAsyncThunk('restaurant/menuItems/fetch', async (menuId: string) => {
  return { menuId, items: await restaurantProfileService.getMenuItems(menuId) };
});

export const createMenuItem = createAsyncThunk(
  'restaurant/menuItems/create',
  async (args: { menuId: string; payload: { name: string; description?: string; price: number; available?: boolean; tagIds?: string[] } }) => {
    const { menuId, payload } = args;
    return { menuId, item: await restaurantProfileService.createMenuItem(menuId, payload) };
  }
);

export const updateMenuItem = createAsyncThunk(
  'restaurant/menuItems/update',
  async (args: { menuId: string; itemId: string; payload: Partial<MenuItem> }) => {
    const { menuId, itemId, payload } = args;
    return { menuId, item: await restaurantProfileService.updateMenuItem(menuId, itemId, payload as any) };
  }
);

export const deleteMenuItem = createAsyncThunk(
  'restaurant/menuItems/delete',
  async (args: { menuId: string; itemId: string }) => {
    const { menuId, itemId } = args;
    await restaurantProfileService.deleteMenuItem(menuId, itemId);
    return { menuId, itemId };
  }
);

export const fetchOrders = createAsyncThunk(
  'restaurant/orders/fetch',
  async (params: { status?: string; page?: number; limit?: number } | undefined) => {
    return await restaurantProfileService.getOrders(params);
  }
);

export const changeOrderStatus = createAsyncThunk(
  'restaurant/orders/status',
  async (args: { orderId: string; status: string }) => {
    const { orderId, status } = args;
    return await restaurantProfileService.updateOrderStatus(orderId, status);
  }
);

export const fetchEarnings = createAsyncThunk('restaurant/earnings/fetch', async (params: { period?: 'week' | 'month' | 'year' | 'all' } | undefined) => {
  return await restaurantProfileService.getEarnings(params);
});

export const fetchReviews = createAsyncThunk('restaurant/reviews/fetch', async (params: { page?: number; limit?: number } | undefined) => {
  return await restaurantProfileService.getReviews(params);
});

// State
interface RestaurantProfileState {
  profile: Profile | null;
  profileLoading: boolean;

  dashboard: Dashboard | null;
  dashboardLoading: boolean;

  menus: Menu[];
  menusLoading: boolean;

  menuItemsByMenuId: Record<string, MenuItem[]>;
  menuItemsLoadingByMenuId: Record<string, boolean>;

  orders: {
    items: Order[];
    page: number;
    totalPages: number;
    total: number;
  };
  ordersLoading: boolean;

  earnings: Earnings | null;
  earningsLoading: boolean;

  reviews: {
    items: Review[];
    page: number;
    totalPages: number;
    total: number;
    averageRating: number | null;
  };
  reviewsLoading: boolean;

  error?: string | null;
}

const initialState: RestaurantProfileState = {
  profile: null,
  profileLoading: false,

  dashboard: null,
  dashboardLoading: false,

  menus: [],
  menusLoading: false,

  menuItemsByMenuId: {},
  menuItemsLoadingByMenuId: {},

  orders: { items: [], page: 1, totalPages: 1, total: 0 },
  ordersLoading: false,

  earnings: null,
  earningsLoading: false,

  reviews: { items: [], page: 1, totalPages: 1, total: 0, averageRating: null },
  reviewsLoading: false,

  error: null
};

const restaurantProfileSlice = createSlice({
  name: 'restaurantProfile',
  initialState,
  reducers: {
    setReviewsPage(state, action: PayloadAction<number>) {
      state.reviews.page = action.payload;
    },
    setOrdersPage(state, action: PayloadAction<number>) {
      state.orders.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Profile
      .addCase(fetchProfile.pending, (s) => { s.profileLoading = true; })
      .addCase(fetchProfile.fulfilled, (s, a) => { s.profileLoading = false; s.profile = a.payload; })
      .addCase(fetchProfile.rejected, (s, a) => { s.profileLoading = false; s.error = a.error.message || 'Failed to fetch profile'; })
      .addCase(saveProfile.pending, (s) => { s.profileLoading = true; })
      .addCase(saveProfile.fulfilled, (s, a) => { s.profileLoading = false; s.profile = a.payload; })
      .addCase(saveProfile.rejected, (s, a) => { s.profileLoading = false; s.error = a.error.message || 'Failed to save profile'; })

      // Dashboard
      .addCase(fetchDashboard.pending, (s) => { s.dashboardLoading = true; })
      .addCase(fetchDashboard.fulfilled, (s, a) => { s.dashboardLoading = false; s.dashboard = a.payload; })
      .addCase(fetchDashboard.rejected, (s, a) => { s.dashboardLoading = false; s.error = a.error.message || 'Failed to fetch dashboard'; })

      // Menus
      .addCase(fetchMenus.pending, (s) => { s.menusLoading = true; })
      .addCase(fetchMenus.fulfilled, (s, a) => { s.menusLoading = false; s.menus = a.payload; })
      .addCase(fetchMenus.rejected, (s, a) => { s.menusLoading = false; s.error = a.error.message || 'Failed to fetch menus'; })
      .addCase(createMenu.fulfilled, (s, a) => { s.menus.push(a.payload); })

      // Menu Items
      .addCase(fetchMenuItems.pending, (s, a) => { const menuId = a.meta.arg as string; s.menuItemsLoadingByMenuId[menuId] = true; })
      .addCase(fetchMenuItems.fulfilled, (s, a) => { s.menuItemsLoadingByMenuId[a.payload.menuId] = false; s.menuItemsByMenuId[a.payload.menuId] = a.payload.items; })
      .addCase(fetchMenuItems.rejected, (s, a) => { const menuId = a.meta.arg as string; s.menuItemsLoadingByMenuId[menuId] = false; s.error = a.error.message || 'Failed to fetch menu items'; })
      .addCase(createMenuItem.fulfilled, (s, a) => {
        const { menuId, item } = a.payload as { menuId: string; item: MenuItem };
        s.menuItemsByMenuId[menuId] = [...(s.menuItemsByMenuId[menuId] || []), item];
      })
      .addCase(updateMenuItem.fulfilled, (s, a) => {
        const { menuId, item } = a.payload as { menuId: string; item: MenuItem };
        s.menuItemsByMenuId[menuId] = (s.menuItemsByMenuId[menuId] || []).map((it) => (it.id === item.id ? item : it));
      })
      .addCase(deleteMenuItem.fulfilled, (s, a) => {
        const { menuId, itemId } = a.payload as { menuId: string; itemId: string };
        s.menuItemsByMenuId[menuId] = (s.menuItemsByMenuId[menuId] || []).filter((it) => it.id !== itemId);
      })

      // Orders
      .addCase(fetchOrders.pending, (s) => { s.ordersLoading = true; })
      .addCase(fetchOrders.fulfilled, (s, a) => {
        s.ordersLoading = false;
        const { orders, pagination } = a.payload as any;
        s.orders.items = orders || [];
        if (pagination) {
          s.orders.page = Number(pagination.page) || 1;
          s.orders.totalPages = Number(pagination.totalPages) || 1;
          s.orders.total = Number(pagination.total) || (orders?.length || 0);
        }
      })
      .addCase(fetchOrders.rejected, (s, a) => { s.ordersLoading = false; s.error = a.error.message || 'Failed to fetch orders'; })
      .addCase(changeOrderStatus.fulfilled, (s, a) => {
        const payload = a.payload as any;
        const updatedOrder = payload?.order || payload; // backward compatibility if API returns only order
        if (updatedOrder?.id) {
          s.orders.items = s.orders.items.map((o) => (o.id === updatedOrder.id ? updatedOrder : o));
        }
        if (payload?.earnings) {
          s.earnings = { ...(s.earnings || {}), ...payload.earnings } as any;
        }
      })

      // Earnings
      .addCase(fetchEarnings.pending, (s) => { s.earningsLoading = true; })
      .addCase(fetchEarnings.fulfilled, (s, a) => { s.earningsLoading = false; s.earnings = a.payload; })
      .addCase(fetchEarnings.rejected, (s, a) => { s.earningsLoading = false; s.error = a.error.message || 'Failed to fetch earnings'; })

      // Reviews
      .addCase(fetchReviews.pending, (s) => { s.reviewsLoading = true; })
      .addCase(fetchReviews.fulfilled, (s, a) => {
        s.reviewsLoading = false;
        const { reviews, averageRating, pagination, totalReviews } = a.payload as any;
        s.reviews.items = reviews || [];
        s.reviews.averageRating = averageRating ?? null;
        if (pagination) {
          s.reviews.page = Number(pagination.page) || 1;
          s.reviews.totalPages = Number(pagination.totalPages) || 1;
          s.reviews.total = Number(pagination.total) || Number(totalReviews) || (reviews?.length || 0);
        } else if (typeof totalReviews !== 'undefined') {
          s.reviews.total = Number(totalReviews);
        }
      })
      .addCase(fetchReviews.rejected, (s, a) => { s.reviewsLoading = false; s.error = a.error.message || 'Failed to fetch reviews'; });
  }
});

export const { setReviewsPage, setOrdersPage } = restaurantProfileSlice.actions;

export default restaurantProfileSlice.reducer;
