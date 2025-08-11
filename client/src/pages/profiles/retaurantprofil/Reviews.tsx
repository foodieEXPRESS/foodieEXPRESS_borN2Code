import React from 'react';
import { useNavigate } from 'react-router-dom';
import './restaurantprofile.css';

const Reviews: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="machraoui-reviews-container">
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
            className="machraoui-nav-tab" 
            onClick={() => handleNavigation('/earnings')}
          >
            Earnings
          </button>
          <button 
            className="machraoui-nav-tab active" 
            onClick={() => handleNavigation('/reviews')}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="machraoui-reviews-card">
        <div className="machraoui-reviews-header">
          <h1 className="machraoui-reviews-title">Customer Reviews</h1>
          <div className="machraoui-reviews-subtitle">
            View and respond to customer feedback and ratings
          </div>
        </div>

        <div className="machraoui-rating-display">
          <div className="machraoui-rating-number">4.8</div>
          <div className="machraoui-rating-text">Based on 247 reviews</div>
        </div>

        <button className="machraoui-view-reviews-btn">View All Reviews</button>
      </div>
    </div>
  );
};

export default Reviews; 