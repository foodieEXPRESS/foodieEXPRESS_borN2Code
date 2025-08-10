import React from 'react';

interface DeliveryRecord {
  orderId: string;
  customer: string;
  items: number;
  restaurant: string;
  date: string;
  time: string;
  status: 'Completed' | 'Canceled';
  earnings: string;
  tip: string;
}

interface DeliveryTableProps {
  records: DeliveryRecord[];
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ records }) => {
  console.log('DeliveryTable: Rendering table with', records.length, 'records');

  const handleViewDetails = (orderId: string) => {
    console.log('DeliveryTable: View details clicked for order:', orderId);
  };

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
              <td>
                <span className={`MA__status-badge ${rec.status === 'Completed' ? 'MA__status-completed' : 'MA__status-canceled'}`}>
                  {rec.status}
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