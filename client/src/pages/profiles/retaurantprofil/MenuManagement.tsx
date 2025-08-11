import React from 'react';
import { useNavigate } from 'react-router-dom';
import './restaurantprofile.css';

const MenuManagement: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const menuItems = [
    {
      name: 'Bruschetta Trio',
      category: 'Starters',
      description: 'Toasted bread with tomato, basil and mozzarella',
      price: '$12.99',
      time: '10 min',
      color: '#f87171',
      status: 'Available',
    },
    {
      name: 'Caesar Salad',
      category: 'Starters',
      description: 'Romaine lettuce, parmesan, croutons, caesar dressing',
      price: '$14.99',
      time: '8 min',
      color: '#34d399',
      status: 'Available',
    },
    {
      name: 'Margherita Pizza',
      category: 'Mains',
      description: 'Fresh tomatoes, mozzarella, basil, olive oil',
      price: '$18.99',
      time: '15 min',
      color: '#f87171',
      status: 'Available',
    },
    {
      name: 'Chicken Alfredo',
      category: 'Mains',
      description: 'Creamy pasta with grilled chicken and parmesan',
      price: '$22.99',
      time: '18 min',
      color: '#34d399',
      status: 'Available',
    },
    {
      name: 'Grilled Salmon',
      category: 'Mains',
      description: 'Atlantic salmon with lemon butter and vegetables',
      price: '$26.99',
      time: '20 min',
      color: '#fca5a5',
      status: 'Out of Stock',
    },
    {
      name: 'Tiramisu',
      category: 'Desserts',
      description: 'Classic Italian dessert with coffee and mascarpone',
      price: '$8.99',
      time: '5 min',
      color: '#fde68a',
      status: 'Available',
    },
    {
      name: 'Chocolate Lava Cake',
      category: 'Desserts',
      description: 'Warm chocolate cake with molten center',
      price: '$9.99',
      time: '12 min',
      color: '#a16207',
      status: 'Out of Stock',
    },
    {
      name: 'Italian Soda',
      category: 'Beverages',
      description: 'Sparkling water with fruit syrup',
      price: '$4.99',
      time: '2 min',
      color: '#60a5fa',
      status: 'Available',
    },
  ];

  return (
    <div className="machraoui-menu-management-container">
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

      {/* Menu Management Section */}
      <div className="machraoui-menu-management-card">
        <div className="machraoui-menu-header">
          <div>
            <h1 className="machraoui-menu-title">Menu Management</h1>
            <div className="machraoui-menu-subtitle">
              Manage your restaurant menu items, prices, and availability
            </div>
          </div>
          <button className="machraoui-add-item-btn">+ Add New Item</button>
        </div>

        {/* Category Filter Tabs */}
        <div className="machraoui-category-tabs">
          <button className="machraoui-category-tab active">All</button>
        </div>

        {/* Menu Items Grid */}
        <div className="machraoui-menu-grid">
          {menuItems.map((item, idx) => (
            <div key={idx} className="machraoui-menu-item-card">
              {/* Status Badge - Top Right */}
              <span className={`machraoui-status-badge-menu ${item.status === 'Available' ? 'available' : 'out-of-stock'}`}>
                {item.status}
              </span>

              {/* Item Content */}
              <div className="machraoui-menu-item-content">
                {/* Icon */}
                <div 
                  className="machraoui-menu-item-icon"
                  style={{ background: item.color }}
                >?</div>

                {/* Item Details */}
                <div className="machraoui-menu-item-details">
                  <div className="machraoui-menu-item-name">{item.name}</div>
                  <div className="machraoui-menu-item-category">{item.category}</div>
                  <div className="machraoui-menu-item-description">{item.description}</div>
                </div>
              </div>

              {/* Price and Time */}
              <div className="machraoui-menu-item-price-time">
                <span className="machraoui-menu-item-price">{item.price}</span>
                <span className="machraoui-menu-item-time">{item.time}</span>
              </div>

              {/* Action Buttons */}
              <div className="machraoui-menu-item-actions">
                <button className="machraoui-edit-btn">Edit</button>
                <button className="machraoui-delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;