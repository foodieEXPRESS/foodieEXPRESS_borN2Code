import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import { fetchDeliveryHistory } from './deliveryHistorySlice';
import SummaryCard from './SummaryCard';
import FilterSort from './FilterSort';
import DeliveryTable from './DeliveryTable';
import '../styles.css';

export default function DeliveryHistory() {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    summary, 
    loading, 
    error
  } = useSelector((state: RootState) => state.deliveryHistory);

  useEffect(() => {
    dispatch(fetchDeliveryHistory('driver-123'));
  }, [dispatch]);

  if (loading) return <div style={{ textAlign: 'center', padding: 50 }}>Loading...</div>;
  
  if (error) return <div style={{ textAlign: 'center', padding: 50, color: 'red' }}>Error: {error}</div>;

  return (
    <div className="MA__delivery-history-container">
      <header className="MA__header-bar">
        <div className="MA__header-logo"><div className="MA__header-logo-icon">+</div>FoodieExpress</div>
        <h1 className="MA__header-title">Delivery History</h1>
      </header>

      <section className="MA__page-title-section">
        <h2 className="MA__page-title-main">Delivery History</h2>
        <p className="MA__page-title-desc">Track your past deliveries and earnings</p>
      </section>

      <div className="MA__summary-cards-row">
        {Object.values(summary).map((card, i) => <SummaryCard key={i} {...card} />)}
      </div>

      <FilterSort />
      <DeliveryTable />
    </div>
  );
}
