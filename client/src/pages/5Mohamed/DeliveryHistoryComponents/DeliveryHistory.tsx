import React from 'react';

// Import Components
import SummaryCard from './SummaryCard';
import FilterSort from './FilterSort';
import DeliveryTable from './DeliveryTable';

// Import Data
import { deliverySummary, deliveryRecords } from './mockData';

// Import CSS from external file
import '../styles.css';

// ============================================================================
// MAIN DELIVERY HISTORY COMPONENT
// ============================================================================

const DeliveryHistory: React.FC = () => {
  console.log('DeliveryHistory component loaded');
  console.log('deliverySummary:', deliverySummary);
  console.log('deliveryRecords:', deliveryRecords);

  return (
    <div className="MA__delivery-history-container">
      <h1>Delivery History Page</h1>
      
      {/* Header Bar */}
      <div className="MA__header-bar">
        <div className="MA__header-logo">
          <div className="MA__header-logo-icon">+</div>
          FoodieExpress
        </div>
        <div className="MA__header-title">Delivery History</div>
      </div>

      {/* Main Title Section */}
      <div className="MA__page-title-section">
        <div className="MA__page-title-main">Delivery History</div>
        <div className="MA__page-title-desc">Track your past deliveries and earnings</div>
      </div>

      {/* Summary Cards */}
      <div className="MA__summary-cards-row">
        <SummaryCard {...deliverySummary.totalEarnings} />
        <SummaryCard {...deliverySummary.completedOrders} />
        <SummaryCard {...deliverySummary.canceledOrders} />
        <SummaryCard {...deliverySummary.avgPerOrder} />
      </div>

      {/* Filter & Sort */}
      <FilterSort />

      {/* Delivery Table */}
      <DeliveryTable records={deliveryRecords} />
    </div>
  );
};

export default DeliveryHistory; 