import React from 'react';
import { useNavigate } from 'react-router-dom';
import './restaurantprofile.css';

const RestaurantProfile: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
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
          <div className="machraoui-restaurant-avatar">BI</div>
          <div className="machraoui-restaurant-info">
            <div className="machraoui-restaurant-name">Bella Italia</div>
            <div className="machraoui-restaurant-address">456 Restaurant Ave, New York, NY</div>
            <div className="machraoui-status-badge">Open</div>
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
            onClick={() => handleNavigation('/earnings')}
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
                <div className="machraoui-stat-value">24</div>
                <div className="machraoui-stat-change">+125 from yesterday</div>
              </div>
            </div>
            <div className="machraoui-stat-accent green"></div>
          </div>

          <div className="machraoui-stat-card">
            <div className="machraoui-stat-content">
              <div>
                <div className="machraoui-stat-label">Today's Earnings</div>
                <div className="machraoui-stat-value">$486.50</div>
                <div className="machraoui-stat-change">+85 from yesterday</div>
              </div>
            </div>
            <div className="machraoui-stat-accent blue"></div>
          </div>

          <div className="machraoui-stat-card">
            <div className="machraoui-stat-content">
              <div>
                <div className="machraoui-stat-label">Average Order</div>
                <div className="machraoui-stat-value">$20.27</div>
                <div className="machraoui-stat-change">+35 from yesterday</div>
              </div>
            </div>
            <div className="machraoui-stat-accent yellow"></div>
          </div>
        </div>

        {/* View Earnings Button */}
        <div className="machraoui-view-earnings-section">
          <button 
            className="machraoui-view-earnings-btn"
            onClick={() => handleNavigation('/earnings')}
          >
            View Detailed Earnings
          </button>
        </div>

        {/* Recent Orders */}
        <div className="machraoui-recent-orders-card">
          <div className="machraoui-orders-header">
            <div className="machraoui-orders-title">Recent Orders</div>
            <div className="machraoui-orders-actions">
              <button className="machraoui-filter-btn">Filter</button>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12345</td>
                <td>John Doe</td>
                <td>Margherita Pizza, Coke</td>
                <td>$24.99</td>
                <td>Delivered</td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>Jane Smith</td>
                <td>Chicken Alfredo, Salad</td>
                <td>$32.50</td>
                <td>In Progress</td>
              </tr>
              <tr>
                <td>#12347</td>
                <td>Mike Johnson</td>
                <td>Caesar Salad, Tiramisu</td>
                <td>$18.75</td>
                <td>Ready</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
