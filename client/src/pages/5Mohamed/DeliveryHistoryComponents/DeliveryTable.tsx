import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

const DeliveryTable: React.FC = () => {
  const { filteredRecords } = useSelector((state: RootState) => state.deliveryHistory);

  if (!filteredRecords?.length) {
    return (
      <div className="MA__delivery-table-container">
        <div className="MA__table-title">Delivery Records</div>
        <div style={{ textAlign: 'center', padding: 40, color: '#666', fontSize: 16 }}>
          No delivery data available
        </div>
      </div>
    );
  }

  return (
    <div className="MA__delivery-table-container">
      <div className="MA__table-title">Delivery Records</div>
      <table className="MA__delivery-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Restaurant</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Earnings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map(({ orderId, customer, items, restaurant, date, time, status, earnings, tip }) => (
            <tr key={orderId}>
              <td className="MA__order-id">{orderId}</td>
              <td>
                {customer}<br />
                <span className="MA__customer-info">{items} items</span>
              </td>
              <td>{restaurant}</td>
              <td>
                {date}<br />
                <span className="MA__customer-info">{time}</span>
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: statusConfig[status].color,
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {statusConfig[status].text}
                </span>
              </td>
              <td>
                ${earnings}<br />
                <span className="MA__earnings-amount">+${tip} tip</span>
              </td>
              <td>
                <button
                  className="MA__view-details"
                  onClick={() => console.log('View details for:', orderId)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const statusConfig = {
  PENDING: { text: 'Pending', color: '#fbbf24' },
  CONFIRMED: { text: 'Confirmed', color: '#6366f1' },
  PREPARING: { text: 'Preparing', color: '#8b5cf6' },
  OUT_FOR_DELIVERY: { text: 'Out for Delivery', color: '#06b6d4' },
  COMPLETED: { text: 'Completed', color: '#22c55e' },
  CANCELLED: { text: 'Cancelled', color: '#f43f5e' }
};

export default DeliveryTable;
