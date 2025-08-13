import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { fetchProfile, fetchDashboard, changeOrderStatus, fetchOrders, fetchMenus } from '../../../store/restaurantProfileSlice';
import './restaurantprofile.css';

const RestaurantProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { profile, dashboard, profileLoading, orders, ordersLoading, menus, menusLoading, reviews } = useSelector((state: RootState) => state.restaurantProfile);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchDashboard());
  }, [dispatch]);

  // Load menus for this restaurant
  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  // Orders pagination and loading
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  useEffect(() => {
    dispatch(fetchOrders({ page: ordersPage, limit: ordersLimit, status: statusFilter }));
  }, [dispatch, ordersPage, ordersLimit, statusFilter]);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  // Order status management
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const orderStatuses = [
    'PENDING',
    'CONFIRMED',
    'PREPARING',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED',
  ] as const;

  // RecentOrder type no longer needed since we use orders from store

  const handleStatusChange = async (
    orderId: string,
    status: (typeof orderStatuses)[number]
  ) => {
    try {
      setUpdatingOrderId(orderId);
      await dispatch(changeOrderStatus({ orderId, status })).unwrap();
      // Refresh dashboard to reflect the latest recent orders stats
      await dispatch(fetchDashboard()).unwrap();
    } catch (err) {
      // Optionally, add a toast/notification here
      console.error('Failed to update order status', err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="machraoui-restaurant-profile-container">
      {/* Top Navigation Bar */}
      <div className="machraoui-top-bar">
        <div className="machraoui-logo-container">
          <div className="machraoui-logo-icon"></div>
          <div className="machraoui-logo-text">
            FoodieExpress
            <span className="machraoui-help-text">Help</span>
          </div>
        </div>
        <button className="machraoui-settings-btn">Settings</button>
      </div>

      {/* Restaurant Information Card */}
      <div className="machraoui-restaurant-card">
        <div className="machraoui-restaurant-header">
          <div className="machraoui-restaurant-avatar">
            {profile?.name ? profile.name.slice(0,2).toUpperCase() : 'RE'}
          </div>
          <div className="machraoui-restaurant-info">
            <div className="machraoui-restaurant-name">{profile?.name || 'Restaurant'}</div>
            <div className="machraoui-restaurant-address">
              {profile?.description || 'Welcome to your restaurant dashboard'}
            </div>
            <div className="machraoui-status-badge">{profile ? 'Active' : 'Loading'}</div>
            {/* Informative profile details */}
            <div className="machraoui-profile-details">
              {profile?.cuisineType && (
                <span className="machraoui-profile-chip">Cuisine: {profile.cuisineType}</span>
              )}
              {profile?.openingHours && (
                <span className="machraoui-profile-chip">Hours: {profile.openingHours}</span>
              )}
              {profile?.phone && (
                <span className="machraoui-profile-chip">Phone: {profile.phone}</span>
              )}
              {Array.isArray(profile?.deliveryOptions) && profile!.deliveryOptions.length > 0 && (
                <span className="machraoui-profile-chip">Delivery: {profile!.deliveryOptions.join(', ')}</span>
              )}
            </div>
            {/* Rating summary */}
            <div className="machraoui-rating-summary">
              <div className="machraoui-rating-number">
                {((reviews.averageRating ?? (reviews.items.length
                  ? reviews.items.reduce((a: number, r: any) => a + (r.rating ?? 0), 0) / reviews.items.length
                  : 0)).toFixed(1))}
              </div>
              <div className="machraoui-rating-text">Based on {reviews.total ?? 0} reviews</div>
            </div>
          </div>
          <button className="machraoui-close-restaurant-btn">Close Restaurant</button>
        </div>

        {/* Navigation Tabs */}
        <div className="machraoui-navigation-tabs">
          <button 
            className="machraoui-nav-tab active" 
            onClick={() => handleNavigation('/restaurant-profile')}
          >
            Orders
          </button>
          <button 
            className="machraoui-nav-tab" 
            onClick={() => handleNavigation('/menu-management')}
          >
            Menu Management
          </button>
          <button 
            className="machraoui-nav-tab" 
            onClick={() => handleNavigation('/earnings-reports')}
          >
            Earnings
          </button>
          <button 
            className="machraoui-nav-tab" 
            onClick={() => handleNavigation('/reviews')}
          >
            Reviews
          </button>
        </div>

        {/* Stats Cards */}
        <div className="machraoui-stats-container">
          <div className="machraoui-stat-card">
            <div className="machraoui-stat-content">
              <div>
                <div className="machraoui-stat-label">Today's Orders</div>
                <div className="machraoui-stat-value">{dashboard?.todayOrders ?? 0}</div>
                <div className="machraoui-stat-change">
                  {dashboard ? `+${Math.max(0, (dashboard.todayOrders || 0) - (dashboard.yesterdayOrders || 0))} from yesterday` : '—'}
                </div>
              </div>
            </div>
            <div className="machraoui-stat-accent green"></div>
          </div>

          <div className="machraoui-stat-card">
            <div className="machraoui-stat-content">
              <div>
                <div className="machraoui-stat-label">Today's Earnings</div>
                <div className="machraoui-stat-value">${(dashboard?.todayEarnings ?? 0).toFixed(2)}</div>
                <div className="machraoui-stat-change">
                  {dashboard ? `+${Math.max(0, (dashboard.todayEarnings || 0) - (dashboard.yesterdayEarnings || 0)).toFixed(2)} from yesterday` : '—'}
                </div>
              </div>
            </div>
            <div className="machraoui-stat-accent blue"></div>
          </div>

          <div className="machraoui-stat-card">
            <div className="machraoui-stat-content">
              <div>
                <div className="machraoui-stat-label">Average Order</div>
                <div className="machraoui-stat-value">
                  ${(() => {
                    const orders = dashboard?.todayOrders ?? 0;
                    const earnings = dashboard?.todayEarnings ?? 0;
                    return orders > 0 ? (earnings / orders).toFixed(2) : '0.00';
                  })()}
                </div>
                <div className="machraoui-stat-change">{dashboard ? 'Updated today' : '—'}</div>
              </div>
            </div>
            <div className="machraoui-stat-accent yellow"></div>
          </div>
        </div>

        {/* View Earnings Button */}
        <div className="machraoui-view-earnings-section">
          <button 
            className="machraoui-view-earnings-btn"
            onClick={() => handleNavigation('/earnings-reports')}
          >
            View Detailed Earnings
          </button>
        </div>

        {/* Recent Orders */}
        <div className="machraoui-recent-orders-card">
          <div className="machraoui-orders-header">
            <div className="machraoui-orders-title">Recent Orders</div>
            <div className="machraoui-orders-actions">
              {/* Status Filter */}
              <select
                className="machraoui-status-select"
                value={statusFilter ?? ''}
                onChange={(e) => {
                  setOrdersPage(1);
                  setStatusFilter(e.target.value || undefined);
                }}
              >
                <option value="">All statuses</option>
                {orderStatuses.map((s) => (
                  <option key={s} value={s}>{s.replaceAll('_', ' ')}</option>
                ))}
              </select>
              <button className="machraoui-export-btn">Export</button>
            </div>
          </div>
          <table className="machraoui-orders-table">
            <thead>
              <tr>
                <th className="machraoui-table-header">Order ID</th>
                <th className="machraoui-table-header">Customer</th>
                <th className="machraoui-table-header">Items</th>
                <th className="machraoui-table-header">Total</th>
                <th className="machraoui-table-header">Status</th>
                <th className="machraoui-table-header">Updated</th>
              </tr>
            </thead>
            <tbody>
              {(orders.items ?? []).map((o: any) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.customer?.fullName ?? 'N/A'}</td>
                  <td>
                    {Array.isArray(o.orderItems) && o.orderItems.length > 0
                      ? o.orderItems
                          .map((it: any) => `${it.menu?.name ?? 'Item'} x${it.quantity ?? 1}`)
                          .join(', ')
                      : (Array.isArray(o.items)
                          ? `${o.items.length} item(s)`
                          : (o.itemsCount ?? '—')
                        )
                    }
                  </td>
                  <td>${(o.totalAmount ?? o.total ?? 0).toFixed ? (o.totalAmount ?? o.total ?? 0).toFixed(2) : Number(o.totalAmount ?? o.total ?? 0).toFixed(2)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span className={`machraoui-status-badge ${
                        o.status === 'PENDING' ? 'is-pending' :
                        o.status === 'CONFIRMED' ? 'is-confirmed' :
                        o.status === 'PREPARING' ? 'is-preparing' :
                        o.status === 'OUT_FOR_DELIVERY' ? 'is-out' :
                        o.status === 'DELIVERED' ? 'is-delivered' :
                        o.status === 'COMPLETED' ? 'is-completed' :
                        o.status === 'CANCELLED' ? 'is-cancelled' : ''
                      }`}>{(o.status || '').replaceAll('_', ' ')}</span>
                      <select
                        className="machraoui-status-select"
                        value={o.status}
                        onChange={(e) =>
                          handleStatusChange(o.id, e.target.value as (typeof orderStatuses)[number])
                        }
                        disabled={updatingOrderId === o.id}
                      >
                        {orderStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s.replaceAll('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>{o.updatedAt ? new Date(o.updatedAt).toLocaleString() : (o.createdAt ? new Date(o.createdAt).toLocaleString() : '—')}</td>
                </tr>
              ))}
              {((orders.items ?? []).length === 0) && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    {ordersLoading ? 'Loading...' : 'No orders found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Orders Pagination */}
          {!ordersLoading && orders.totalPages > 1 && (
            <div className="machraoui-pagination-container">
              <button
                className="machraoui-view-reviews-btn"
                onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
                disabled={ordersPage === 1}
              >
                Previous
              </button>
              <div className="machraoui-pagination-info">
                Page {orders.page} of {orders.totalPages}
              </div>
              <button
                className="machraoui-view-reviews-btn"
                onClick={() => setOrdersPage((p) => Math.min(orders.totalPages, p + 1))}
                disabled={ordersPage === orders.totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Menus Overview */}
        <div className="machraoui-recent-orders-card" style={{ marginTop: 24 }}>
          <div className="machraoui-orders-header">
            <div className="machraoui-orders-title">Your Menus</div>
            <div className="machraoui-orders-actions">
              <button className="machraoui-view-earnings-btn" onClick={() => handleNavigation('/menu-management')}>
                Manage Menus
              </button>
            </div>
          </div>
          {menusLoading && <div style={{ padding: '12px 16px' }}>Loading menus...</div>}
          {!menusLoading && menus.length === 0 && <div style={{ padding: '12px 16px' }}>No menus yet</div>}
          {!menusLoading && menus.length > 0 && (
            <div className="machraoui-menus-grid">
              {menus.map((m: any) => (
                <div key={m.id} className="machraoui-menu-card">
                  <div className="machraoui-menu-card-title">{m.name}</div>
                  {m.description && <div className="machraoui-menu-card-desc">{m.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
