// SummaryCard.tsx
import React from 'react';
import type { OrderSummaryCard } from '../../../types/mc_Types';
import { colorMap } from '../../../types/mc_Types';

const SummaryCard: React.FC<OrderSummaryCard> = ({ icon, label, value, color }) => {
  const iconBgClass = colorMap[color] || 'bg-gray-300';

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-56 h-36 flex flex-col items-start justify-between">
      {/* Icon */}
      <div className={`${iconBgClass} rounded-lg w-10 h-10 flex items-center justify-center text-white text-xl`}>
        {icon}
      </div>

      {/* Label */}
      <div className="text-gray-500 font-medium text-sm">{label}</div>

      {/* Value */}
      <div className="text-gray-900 font-bold text-2xl">{value}</div>
    </div>
  );
};

export default SummaryCard;
