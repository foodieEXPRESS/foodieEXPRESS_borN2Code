import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { fetchOrderHistory } from '../../store/orderHistorySlice';
import type {OrderSummaryCard } from '../../types/mc_Types';

const colorMap: Record<string, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-400',
  gray: 'bg-gray-400',
};

const OrderHistory: React.FC = () => {
  const { records, loading, error } = useSelector((state: RootState) => state.orderHistory);

  const [dateFilter, setDateFilter] = useState('All Time');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const dispatch = useDispatch<AppDispatch>();

  const userId = "53b1bef6-b6dd-40eb-bd39-e72a5e3e0632"; 

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrderHistory(userId));
      console.log('Order history fetched:', records);
    }
  }, [dispatch, userId]);

  const formatPrice = (price?: number | string | null) => {
    if (price == null) return '0.00';
    return typeof price === 'string' ? parseFloat(price).toFixed(2) : price.toFixed(2);
  };

  const totalOrders = Array.isArray(records) ? records.length : 0;

  const totalPrice = Array.isArray(records)
    ? records.reduce((sum, rec) => sum + (rec.totalAmount || 0), 0)
    : 0;
const orderSummary: Record<string, OrderSummaryCard> = {
  totalOrders: { icon: '📦', label: 'Total Orders', value: totalOrders, color: 'red' },
  totalPrice: { icon: '💰', label: 'Total Price', value: totalPrice, color: 'blue' },
};


  const filteredRecords = useMemo(() => {
    let filtered = [...records];

    if (statusFilter !== 'All Status') {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    return filtered;
  }, [dateFilter, statusFilter, records]);

  if (loading) return <div className="p-8 text-center text-xl">Loading order history...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 md:px-12">
      {/* Title */}
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-1 text-lg">Track your past orders and earnings</p>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {Object.values(orderSummary).map(({ icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between h-40">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl mb-3 ${
                colorMap[color] || 'bg-gray-300'
              }`}
            >
              {icon}
            </div>
            <div className="text-sm font-medium text-gray-500">{label}</div>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
          </div>
        ))}
      </section>

      {/* Filters */}

      <section className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="font-bold text-xl whitespace-nowrap">Filter & Sort</h2>
        <div className="flex flex-col sm:flex-row gap-4 md:ml-auto w-full sm:w-auto">
          {/* Date Filter */}

          <label className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
            Date:
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="ml-2 bg-gray-200 text-gray-900 font-semibold text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>All Time</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </label>

          {/* Status Filter */}
          <label className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
            Status:
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="ml-2 bg-gray-200 text-gray-900 font-semibold text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>All Status</option>
              <option>PENDING</option>
              <option>CONFIRMED</option>
              <option>PREPARING</option>
              <option>OUT_FOR_DELIVERY</option>
              <option>DELIVERED</option>
              <option>CANCELLED</option>
            </select>
          </label>
        </div>
      </section>

      {/* Orders Table */}
      <section className="bg-white rounded-2xl shadow-md p-0 overflow-x-auto">
        <div className="text-2xl font-bold px-8 pt-8 pb-6 text-gray-900">Order Records</div>
        <table className="min-w-full border-separate border-spacing-0 text-base bg-transparent">
          <thead>
            <tr>
              {[
                'Order ID',
                'Customer ID',
                'Date',
                'Status',
                'Total Amount',
              ].map((header) => (
                <th
                  key={header}
                  className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No orders found for selected filters.
                </td>
              </tr>
            )}

            {filteredRecords.map((rec) => (
              <tr
                key={rec.id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-indigo-50 cursor-pointer"
              >
                <td className="text-indigo-700 font-bold underline px-8 py-4">{rec.id}</td>
                <td className="px-8 py-4">{rec.customerId}</td>
                <td className="px-8 py-4">
                  {new Date(rec.createdAt).toLocaleDateString()}
                  <br />
                  <span className="text-gray-500 text-xs font-normal">
                    {new Date(rec.createdAt).toLocaleTimeString()}
                  </span>
                </td>
                <td className="px-8 py-4">
                  <span
                    className={`inline-block rounded-lg px-4 py-1 text-sm font-semibold ${
                      rec.status === 'DELIVERED' 
                        ? 'text-green-600 bg-green-100' 
                        : rec.status === 'CANCELLED'
                        ? 'text-red-600 bg-red-100'
                        : 'text-blue-600 bg-blue-100'
                    }`}
                  >
                    {rec.status}
                  </span>
                </td>
                <td className="px-8 py-4">
                  ${formatPrice(rec.totalAmount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OrderHistory;
