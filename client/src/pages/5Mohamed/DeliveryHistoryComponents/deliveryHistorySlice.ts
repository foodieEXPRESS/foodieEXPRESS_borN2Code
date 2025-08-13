import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Order {
  orderId: string;
  customer: string;
  items: number;
  restaurant: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'CANCELLED';
  earnings: string;
  tip: string;
}

interface Filters {
  dateRange: string;
  status: string;
}

interface State {
  records: Order[];
  filteredRecords: Order[];
  summary: Record<string, { label: string; value: string; color: string; icon: string }>;
  loading: boolean;
  error: string | null;
  filters: Filters;
}

const initialSummary = {
  totalEarnings: { icon: '✔️', label: 'Total Earnings', value: '$0.00', color: '#22c55e' },
  completedOrders: { icon: '⭐', label: 'Completed Orders', value: '0', color: '#6366f1' },
  canceledOrders: { icon: '⛔', label: 'Canceled Orders', value: '0', color: '#f43f5e' },
  avgPerOrder: { icon: '⏰', label: 'Avg. Per Order', value: '$0.00', color: '#fbbf24' },
};

const initialState: State = {
  records: [],
  filteredRecords: [],
  summary: initialSummary,
  loading: false,
  error: null,
  filters: { dateRange: 'all', status: 'all' },
};

const filterRecords = (records: Order[], { dateRange, status }: Filters) => {
  let filtered = records;
  if (dateRange !== 'all') {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - (dateRange === 'last7days' ? 7 : 30));
    filtered = filtered.filter(o => new Date(o.date) >= cutoff);
  }
  if (status !== 'all') filtered = filtered.filter(o => o.status === status);
  return filtered;
};

const calcSummary = (orders: Order[]) => {
  const completed = orders.filter(o => o.status === 'COMPLETED');
  const canceled = orders.filter(o => o.status === 'CANCELLED');
  const total = orders.reduce((sum, o) => sum + parseFloat(o.earnings), 0);
  return {
    totalEarnings: { ...initialSummary.totalEarnings, value: `$${total.toFixed(2)}` },
    completedOrders: { ...initialSummary.completedOrders, value: `${completed.length}` },
    canceledOrders: { ...initialSummary.canceledOrders, value: `${canceled.length}` },
    avgPerOrder: { ...initialSummary.avgPerOrder, value: `$${(completed.length ? total / completed.length : 0).toFixed(2)}` },
  } as State['summary'];
};

export const fetchDeliveryHistory = createAsyncThunk('deliveryHistory/fetch', async (driverId: string) => {
  const res = await fetch(`http://localhost:8080/api/deliveries/driver/${driverId}`);
  if (!res.ok) throw new Error('Fetch failed');
  const { success, data } = await res.json();
  if (!success || !data) throw new Error('Invalid data');
  return data.map((o: any) => ({
    orderId: o.orderId ?? 'N/A',
    customer: o.customer ?? 'Unknown',
    items: o.items ?? 0,
    restaurant: o.restaurant ?? '—',
    date: o.date ?? 'N/A',
    time: o.time ?? 'N/A',
    status: o.status ?? 'PENDING',
    earnings: o.earnings ?? '0',
    tip: o.tip ?? '0',
  }));
});

const slice = createSlice({
  name: 'deliveryHistory',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
      state.filteredRecords = filterRecords(state.records, action.payload);
      state.summary = calcSummary(state.filteredRecords);
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDeliveryHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.records = payload;
        state.filteredRecords = filterRecords(payload, state.filters);
        state.summary = calcSummary(state.filteredRecords);
      })
      .addCase(fetchDeliveryHistory.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Fetch error';
      });
  }
});

export const { setFilters, clearError } = slice.actions;
export default slice.reducer;
