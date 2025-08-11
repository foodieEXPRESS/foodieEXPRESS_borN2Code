import React from 'react';

interface DeliveryRecord {
  orderId: string;
  customer: string;
  items: number;
  restaurant: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  earnings: string;
  tip: string;
}

interface DeliveryTableProps {
  records: DeliveryRecord[];
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ records }) => {
  console.log('🔍 DeliveryTable: Rendering table with', records.length, 'records');
  console.log('📋 Records data:', records);

  const handleViewDetails = (orderId: string) => {
    console.log('DeliveryTable: View details clicked for order:', orderId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return '#22c55e'; // Green
      case 'CANCELLED':
        return '#f43f5e'; // Red
      case 'PENDING':
        return '#fbbf24'; // Yellow
      case 'CONFIRMED':
        return '#6366f1'; // Blue
      case 'PREPARING':
        return '#8b5cf6'; // Purple
      case 'OUT_FOR_DELIVERY':
        return '#06b6d4'; // Cyan
      default:
        return '#6b7280'; // Gray
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'Delivered';
      case 'CANCELLED':
        return 'Cancelled';
      case 'PENDING':
        return 'Pending';
      case 'CONFIRMED':
        return 'Confirmed';
      case 'PREPARING':
        return 'Preparing';
      case 'OUT_FOR_DELIVERY':
        return 'Out for Delivery';
      default:
        return status;
    }
  };
  
  if (records && records.length > 0) {
    console.log('✅ First record example:', records[0]);
    console.log('🎨 Status colors test:', {
      first: getStatusColor(records[0].status),
      firstText: getStatusText(records[0].status)
    });
  }

  // إذا لم توجد بيانات
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
          {records.map((rec) => (
            <tr key={rec.orderId}>
              <td className="MA__order-id">{rec.orderId}</td>
              <td>{rec.customer}<br /><span className="MA__customer-info">{rec.items} items</span></td>
              <td>{rec.restaurant}</td>
              <td>{rec.date}<br /><span className="MA__customer-info">{rec.time}</span></td>
              <td className="MA__status-cell">
                  <span 
                    className="MA__status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(rec.status),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    {getStatusText(rec.status)}
                  </span>
                </td>
              <td>
                ${rec.earnings}
                <br />
                <span className="MA__earnings-amount">+${rec.tip} tip</span>
              </td>
              <td>
                <button 
                  className="MA__view-details" 
                  onClick={() => handleViewDetails(rec.orderId)}
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