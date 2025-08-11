import React from 'react';
import { useNavigate } from 'react-router-dom';
import './restaurantprofile.css';

const Earnings: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const earningsMetrics = [
    {
      label: "This Week",
      amount: "$3,240.75"
    },
    {
      label: "This Month",
      amount: "$12,856.20"
    },
    {
      label: "All Time",
      amount: "$89,432.15"
    }
  ];

  return (
    <div className="machraoui-earnings-container">
      {/* Top Navigation Bar */}
      <div className="machraoui-top-bar">
        <div className="machraoui-logo-container">
          <div className="machraoui-logo-icon"></div>
          <div className="machraoui-logo-text">
            FoodieExpress
            <span className="machraoui-help-text">help</span>
          </div>
        </div>
        <button className="machraoui-settings-btn">Settings</button>
      </div>

      {/* Restaurant Information Card */}
      <div className="machraoui-restaurant-card">
        <div className="machraoui-restaurant-header">
          <div 
            className="machraoui-restaurant-avatar"
            style={{ background: '#666' }}
          >
            BI
          </div>
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
            className="machraoui-nav-tab" 
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
            className="machraoui-nav-tab active" 
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
      </div>

      {/* Earnings Overview Section */}
      <div className="machraoui-earnings-overview-card">
        <div className="machraoui-earnings-overview-header">
          <h1 className="machraoui-earnings-overview-title">Earnings Overview</h1>
          <div className="machraoui-earnings-overview-subtitle">
            Track your daily, weekly, and monthly earnings with detailed analytics
          </div>
        </div>

        {/* Earnings Metrics Grid */}
        <div className="machraoui-earnings-metrics-grid">
          {earningsMetrics.map((metric, idx) => (
            <div key={idx} className="machraoui-earnings-metric-card">
              <div className="machraoui-earnings-metric-label">{metric.label}</div>
              <div className="machraoui-earnings-metric-amount">{metric.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Earnings; 