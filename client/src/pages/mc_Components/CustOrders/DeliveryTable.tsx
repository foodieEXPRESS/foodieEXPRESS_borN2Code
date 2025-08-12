import React from 'react';
import type { OrderTableProps } from '../../../types/mc_Types';

const OrderTable: React.FC<OrderTableProps> = ({ records }) => {
  console.log('OrderTable: Rendering table with', records.length, 'records');

  return (
    <div className="bg-white rounded-2xl shadow-md p-0 m-12">
      <div className="text-2xl font-bold px-8 pt-8 pb-6 text-gray-900">Order Records</div>
      <table className="w-full border-separate border-spacing-0 text-base bg-transparent">
        <thead>
          <tr>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Order ID</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Owner</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Restaurant</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Date & Time</th>
            <th className="text-left px-8 pt-4 pb-3 font-bold text-gray-600 text-sm border-b-2 border-gray-200">Prices</th>
          </tr>
        </thead>
       <tbody>
  {records.map((rec) => (
    <tr key={rec.orderId} className="border-b border-gray-200 last:border-b-0">
      <td className="text-indigo-700 font-bold cursor-pointer hover:text-indigo-900 underline px-8 py-4">
        {rec.orderId}
      </td>
      <td className="px-8 py-4">
        {rec.owner}
      </td>
      <td className="px-8 py-4">
        {rec.restaurant}
        <br />
        <span className="text-gray-500 text-xs font-normal">{rec.items} items</span>
      </td>
      <td className="px-8 py-4">
        {rec.date}
        <br />
        <span className="text-gray-500 text-xs font-normal">{rec.time}</span>
      </td>
      <td className="px-8 py-4">
        ${rec.prices}
        <br />
        <span className="text-green-600 text-xs font-medium">+${rec.prices} prices</span>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default OrderTable;
