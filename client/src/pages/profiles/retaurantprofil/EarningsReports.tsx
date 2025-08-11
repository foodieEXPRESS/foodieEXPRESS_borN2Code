import React from 'react';
import { useNavigate } from 'react-router-dom';
import './restaurantprofile.css';

const EarningsReports: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const metrics = [
    {
      title: "Today's Sales",
      amount: "$486.50",
      change: "+8.2% vs yesterday",
      details: "24 orders + $20.27 avg",
      accent: "green"
    },
    {
      title: "This Week",
      amount: "$2,847.20",
      change: "+12.5% vs last week",
      details: "142 orders + $20.05 avg",
      accent: "blue"
    },
    {
      title: "This Month",
      amount: "$12,456.80",
      change: "+18.3% vs last month",
      details: "623 orders + $19.99 avg",
      accent: "yellow"
    },
    {
      title: "Total Earnings",
      amount: "$45,892.30",
      change: "All time",
      details: "2,347 orders + $19.55 avg",
      accent: "purple"
    }
  ];

  const revenueBreakdown = [
    {
      label: "Food Sales",
      amount: "$11,247.60",
      percentage: "90.3%",
      dot: "blue"
    },
    {
      label: "Delivery Fees",
      amount: "$1,209.20",
      percentage: "9.7%",
      dot: "green"
    },
    {
      label: "Platform Fees",
      amount: "-$1,869.12",
      percentage: "15%",
      dot: "red",
      negative: true
    }
  ];

  const topItems = [
    {
      name: "Margherita Pizza",
      orders: "89 orders",
      sales: "$1,689.11",
      change: "+15%",
      icon: "🍕",
      color: "#f87171"
    },
    {
      name: "Chicken Alfredo",
      orders: "67 orders",
      sales: "$1,540.33",
      change: "+8%",
      icon: "🍝",
      color: "#34d399"
    },
    {
      name: "Caesar Salad",
      orders: "54 orders",
      sales: "$809.46",
      change: "+12%",
      icon: "🥗",
      color: "#06b6d4"
    }
  ];

  return (
    <div className="machraoui-earnings-reports-container">
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

      {/* Earnings & Reports Section */}
      <div className="machraoui-earnings-reports-card">
        <div className="machraoui-earnings-header">
          <div>
            <h1 className="machraoui-earnings-title">Earnings & Reports</h1>
            <div className="machraoui-earnings-subtitle">
              Track your restaurant's financial performance and sales analytics
            </div>
          </div>
          <div className="machraoui-earnings-actions">
            <button className="machraoui-export-report-btn">Export Report</button>
            <button className="machraoui-download-pdf-btn">Download PDF</button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="machraoui-earnings-tabs">
          <button className="machraoui-earnings-tab active">Overview</button>
          <button className="machraoui-earnings-tab">Analytics</button>
          <button className="machraoui-earnings-tab">Payouts</button>
        </div>

        {/* Key Metrics Cards */}
        <div className="machraoui-metrics-grid">
          {metrics.map((metric, idx) => (
            <div key={idx} className="machraoui-metric-card">
              <div className={`machraoui-metric-accent ${metric.accent}`}></div>
              <div className="machraoui-metric-title">{metric.title}</div>
              <div className="machraoui-metric-amount">{metric.amount}</div>
              <div className="machraoui-metric-change">{metric.change}</div>
              <div className="machraoui-metric-details">{metric.details}</div>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="machraoui-additional-sections">
          {/* Weekly Orders */}
          <div className="machraoui-weekly-orders-section">
            <div className="machraoui-weekly-orders-title">Weekly Orders</div>
            <div className="machraoui-weekly-orders-placeholder">
              Chart placeholder
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="machraoui-revenue-breakdown-section">
            <div className="machraoui-revenue-breakdown-title">Revenue Breakdown</div>
            {revenueBreakdown.map((item, idx) => (
              <div key={idx} className="machraoui-revenue-item">
                <div className="machraoui-revenue-label">
                  <div className={`machraoui-revenue-dot ${item.dot}`}></div>
                  {item.label}
                </div>
                <div className={`machraoui-revenue-amount ${item.negative ? 'negative' : ''}`}>
                  {item.amount} ({item.percentage})
                </div>
              </div>
            ))}
            <div className="machraoui-net-earnings">
              <div className="machraoui-net-earnings-amount">$10,587.68</div>
            </div>
          </div>
        </div>

        {/* Top Performing Items */}
        <div className="machraoui-top-performing-section">
          <div className="machraoui-top-performing-title">Top Performing Items</div>
          {topItems.map((item, idx) => (
            <div key={idx} className="machraoui-top-item">
              <div 
                className="machraoui-top-item-icon"
                style={{ background: item.color }}
              >
                {item.icon}
              </div>
              <div className="machraoui-top-item-details">
                <div className="machraoui-top-item-name">{item.name}</div>
                <div className="machraoui-top-item-stats">
                  <span>{item.orders}</span>
                  <span>{item.sales}</span>
                  <span className="machraoui-top-item-change">{item.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningsReports; 