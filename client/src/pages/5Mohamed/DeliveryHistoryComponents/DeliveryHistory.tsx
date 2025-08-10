import React from 'react';
import SummaryCard from './SummaryCard';
import FilterSort from './FilterSort';
import DeliveryTable from './DeliveryTable';
import { deliverySummary, deliveryRecords } from './mockData';
import '../styles.css';

const DeliveryHistory: React.FC = () => {
  console.log('DeliveryHistory: Component loaded with data:', { deliverySummary, deliveryRecords });

  return (
    <div className="MA__delivery-history-container">
     
      
      <div className="MA__header-bar">
        <div className="MA__header-logo">
          <div className="MA__header-logo-icon">+</div>
          FoodieExpress
        </div>
        <div className="MA__header-title">Delivery History</div>
      </div>

      <div className="MA__page-title-section">
        <div className="MA__page-title-main">Delivery History</div>
        <div className="MA__page-title-desc">Track your past deliveries and earnings</div>
      </div>

      <div className="MA__summary-cards-row">
        <SummaryCard {...deliverySummary.totalEarnings} />
        <SummaryCard {...deliverySummary.completedOrders} />
        <SummaryCard {...deliverySummary.canceledOrders} />
        <SummaryCard {...deliverySummary.avgPerOrder} />
      </div>

      <FilterSort />
      <DeliveryTable records={deliveryRecords} />
    </div>
  );
};

export default DeliveryHistory; 