import api from './api';

// Restaurant Profile Service matching backend routes (no restaurantId in paths)
const restaurantProfileService = {
  // --- helpers ---
  _absoluteUrl(url: string): string {
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url;
    // Strip trailing '/api' from baseURL to allow serving static/media from same origin
    const base = (api.defaults.baseURL || '').replace(/\/$/, '').replace(/\/api$/, '');
    if (url.startsWith('/')) return `${base}${url}`;
    return `${base}/${url}`;
  },
  _normalizeMediaArray(data: any): Array<{ url: string; [k: string]: any }> {
    if (!data) return [];
    const arr = Array.isArray(data) ? data : (data.media ? [].concat(data.media) : [data]);
    return arr
      .map((m: any) => (typeof m === 'string' ? { url: m } : m))
      .filter((m: any) => m && m.url)
      .map((m: any) => ({ ...m, url: (restaurantProfileService as any)._absoluteUrl(m.url) }));
  },
  // Profile
  getProfile: async () => {
    const { data } = await api.get('/restaurant-profile/profile');
    return data;
  },
  updateProfile: async (payload: {
    name?: string;
    cuisineType?: string;
    description?: string;
    address?: string;
    phone?: string;
    openingHours?: string;
    deliveryOptions?: string[];
    averagePrepTime?: number;
  }) => {
    const { data } = await api.put('/restaurant-profile/profile', payload);
    return data;
  },

  // Dashboard
  getDashboard: async () => {
    const { data } = await api.get('/restaurant-profile/dashboard');
    return data;
  },

  // Menus
  getMenus: async () => {
    const { data } = await api.get('/restaurant-profile/menus');
    return data;
  },
  createMenu: async (payload: { name: string; description?: string }) => {
    const { data } = await api.post('/restaurant-profile/menus', payload);
    return data;
  },

  // Menu Items
  getMenuItems: async (menuId: string) => {
    const { data } = await api.get(`/restaurant-profile/menus/${menuId}/items`);
    return data;
  },
  createMenuItem: async (
    menuId: string,
    payload: {
      name: string;
      description?: string;
      price: number;
      available?: boolean;
      tagIds?: string[];
    }
  ) => {
    const { data } = await api.post(`/restaurant-profile/menus/${menuId}/items`, payload);
    return data;
  },
  updateMenuItem: async (
    menuId: string,
    itemId: string,
    payload: {
      name?: string;
      description?: string;
      price?: number;
      available?: boolean;
      tagIds?: string[];
    }
  ) => {
    const { data } = await api.put(`/restaurant-profile/menus/${menuId}/items/${itemId}`, payload);
    return data;
  },
  deleteMenuItem: async (menuId: string, itemId: string) => {
    const { data } = await api.delete(`/restaurant-profile/menus/${menuId}/items/${itemId}`);
    return data;
  },

  // Orders
  getOrders: async (params?: { status?: string; page?: number; limit?: number }) => {
    const { data } = await api.get('/restaurant-profile/orders', { params });
    return data;
  },
  updateOrderStatus: async (orderId: string, status: string) => {
    const { data } = await api.put(`/restaurant-profile/orders/${orderId}/status`, { status });
    return data;
  },

  // Earnings
  getEarnings: async (params?: { period?: 'week' | 'month' | 'year' | 'all' }) => {
    const { data } = await api.get('/restaurant-profile/earnings', { params });
    return data;
  },

  // Reviews
  getReviews: async (params?: { page?: number; limit?: number }) => {
    const { data } = await api.get('/restaurant-profile/reviews', { params });
    return data;
  },

  // Media (lightweight helpers for images)
  getMedia: async (entity: 'menuItem' | 'menu' | 'profile', entityId: string) => {
    // Backend may return 404 when no media exists; treat as empty list for UX
    try {
      // Server mounts media routes under /api/media/:entityType/:entityId
      // Map 'profile' to 'restaurant' for backend
      const entityType = entity === 'profile' ? 'restaurant' : entity;
      const { data } = await api.get(`/media/${entityType}/${entityId}`);
      return (restaurantProfileService as any)._normalizeMediaArray(data);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        return [];
      }
      // Fallback: return empty to avoid blocking UI; optionally rethrow/log if needed
      return [];
    }
  },
  uploadMenuItemImage: async (menuId: string, itemId: string, file: File) => {
    const form = new FormData();
    // Backend expects field name 'image'
    form.append('image', file);
    const { data } = await api.post(
      // Server route: POST /api/media/menu-item/:menuId/:itemId
      `/media/menu-item/${menuId}/${itemId}`,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    const normalized = (restaurantProfileService as any)._normalizeMediaArray(data);
    // Return first uploaded media or raw data
    return normalized[0] || data;
  }
};

export default restaurantProfileService;
