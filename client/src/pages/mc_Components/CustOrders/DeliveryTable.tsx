import React from 'react';
import type { OrderTableProps } from '../../../types/mc_Types';

const OrderTable: React.FC<OrderTableProps> = ({ records }) => {
  console.log('OrderTable: Rendering table with', records.length, 'records');

  const handleViewDetails = (orderId: string) => {
    console.log('OrderTable: View details clicked for order:', orderId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-0 m-12">
      <div className="text-2xl font-bold px-8 pt-8 pb-6 text-gray-900">Order Records</div>
      <table className="w-full border-separate border-spacing-0 text-base bg-transparent">
        <thead>
          <tr>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Order ID</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Customer</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Restaurant</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Date & Time</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Status</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Earnings</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.orderId} className="border-b border-gray-200 last:border-b-0">
              <td className="text-indigo-700 font-bold cursor-pointer hover:text-indigo-900 underline px-8 py-4">
                {rec.orderId}
              </td>
              <td className="px-8 py-4">
                {rec.customer}
                <br />
                <span className="text-gray-500 text-xs font-normal">{rec.items} items</span>
              </td>
              <td className="px-8 py-4">{rec.restaurant}</td>
              <td className="px-8 py-4">
                {rec.date}
                <br />
                <span className="text-gray-500 text-xs font-normal">{rec.time}</span>
              </td>
              <td className="px-8 py-4">
                <span
                  className={`inline-block rounded-lg px-4 py-1 text-sm font-semibold ${
                    rec.status === 'Completed'
                      ? 'text-green-600 bg-green-100'
                      : 'text-red-600 bg-red-100'
                  }`}
                >
                  {rec.status}
                </span>
              </td>
              <td className="px-8 py-4">
                ${rec.earnings}
                <br />
                <span className="text-green-600 text-xs font-medium">+${rec.tip} tip</span>
              </td>
              <td className="px-8 py-4">
                <button
                  onClick={() => handleViewDetails(rec.orderId)}
                  className="text-indigo-700 font-bold text-sm underline hover:text-indigo-900"
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

export default OrderTable;
