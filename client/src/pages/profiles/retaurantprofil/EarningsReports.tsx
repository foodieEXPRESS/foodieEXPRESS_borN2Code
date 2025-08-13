import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import type { RootState } from '../../../store';
import { fetchEarnings } from '../../../store/restaurantProfileSlice';
import './restaurantprofile.css';

// Define the shape of a top performing item so TS doesn't infer `never`
type TopItem = {
  color: string;
  icon: React.ReactNode;
  name: string;
  orders: number | string;
  sales: number | string;
  change: string;
};

const EarningsReports: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { earnings, earningsLoading, error } = useSelector((s: RootState) => s.restaurantProfile);
  const [period, setPeriod] = useState<'week' | 'month' | 'year' | 'all'>('week');

  useEffect(() => {
    dispatch(fetchEarnings({ period }));
  }, [dispatch, period]);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const metrics = useMemo(() => {
    const total = earnings?.totalEarnings ?? 0;
    const orders = earnings?.totalOrders ?? 0;
    const avg = earnings?.averageOrderValue ?? 0;
    return [
      {
        title: 'Total Earnings',
        amount: `$${total.toFixed(2)}`,
        change: 'All time',
        details: `${orders} orders + $${avg.toFixed(2)} avg`,
        accent: 'purple'
      }
    ];
  }, [earnings]);

  const daily = earnings?.dailyEarnings ?? [];

  const topItems: TopItem[] = []; // placeholder for future enhancement

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
          <div className="machraoui-earnings-actions" style={{ display: 'flex', gap: 8 }}>
            <select className="machraoui-earnings-tab" value={period} onChange={(e) => setPeriod(e.target.value as any)}>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="all">All</option>
            </select>
            <button className="machraoui-export-report-btn">Export CSV</button>
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
          {earningsLoading && <div style={{ gridColumn: '1/-1', textAlign: 'center' }}>Loading earnings...</div>}
          {error && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'red' }}>{error}</div>}
          {!earningsLoading && metrics.map((metric, idx) => (
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
          {/* Monthly Earnings (list) */}
          <div className="machraoui-weekly-orders-section">
            <div className="machraoui-weekly-orders-title">Earnings ({period})</div>
            <div className="machraoui-weekly-orders-placeholder" style={{ display: 'grid', gap: 8 }}>
              {daily.map((d: any) => (
                <div key={d.date} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{d.date}</span>
                  <span>${(d.earnings ?? 0).toFixed(2)} • {d.orders ?? 0} orders</span>
                </div>
              ))}
              {!daily.length && !earningsLoading && <div style={{ textAlign: 'center' }}>No data</div>}
            </div>
          </div>

          {/* Summary */}
          <div className="machraoui-revenue-breakdown-section">
            <div className="machraoui-revenue-breakdown-title">Summary</div>
            <div className="machraoui-revenue-item">
              <div className="machraoui-revenue-label">Total Earnings</div>
              <div className="machraoui-revenue-amount">${(earnings?.totalEarnings ?? 0).toFixed(2)}</div>
            </div>
            <div className="machraoui-revenue-item">
              <div className="machraoui-revenue-label">Total Orders</div>
              <div className="machraoui-revenue-amount">{earnings?.totalOrders ?? 0}</div>
            </div>
            <div className="machraoui-net-earnings">
              <div className="machraoui-net-earnings-amount">Avg Order: ${((earnings?.averageOrderValue) ?? 0).toFixed(2)}</div>
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