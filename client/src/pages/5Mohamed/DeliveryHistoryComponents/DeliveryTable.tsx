import React from 'react';

interface DeliveryRecord {
  orderId: string;
  customer: string;
  items: number;
  restaurant: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'CANCELLED';
  earnings: string;
  tip: string;
}

interface DeliveryTableProps {
  records: DeliveryRecord[];
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ records }) => {
  const statusConfig = {
    PENDING: { text: 'Pending', color: '#fbbf24' },
    CONFIRMED: { text: 'Confirmed', color: '#6366f1' },
    PREPARING: { text: 'Preparing', color: '#8b5cf6' },
    OUT_FOR_DELIVERY: { text: 'Out for Delivery', color: '#06b6d4' },
    COMPLETED: { text: 'Completed', color: '#22c55e' },
    CANCELLED: { text: 'Cancelled', color: '#f43f5e' }
  };

  if (!records || records.length === 0) {
    return (
      <div className="MA__delivery-table-container">
        <div className="MA__table-title">Delivery Records</div>
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#666',
          fontSize: '16px'
        }}>
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
          {records.map((record) => (
            <tr key={record.orderId}>
              <td className="MA__order-id">{record.orderId}</td>
              <td>
                {record.customer}
                <br />
                <span className="MA__customer-info">{record.items} items</span>
              </td>
              <td>{record.restaurant}</td>
              <td>
                {record.date}
                <br />
                <span className="MA__customer-info">{record.time}</span>
              </td>
              <td>
                <span 
                  style={{ 
                    backgroundColor: statusConfig[record.status].color,
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {statusConfig[record.status].text}
                </span>
              </td>
              <td>
                ${record.earnings}
                <br />
                <span className="MA__earnings-amount">+${record.tip} tip</span>
              </td>
              <td>
                <button 
                  className="MA__view-details"
                  onClick={() => console.log('View details for:', record.orderId)}
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

export default DeliveryTable; 