import React from 'react';
import type { OrderSummaryCard } from '../../../types/mc_Types';
import  { colorMap } from '../../../types/mc_Types';


const SummaryCard: React.FC<OrderSummaryCard> = ({ icon, label, value, color }) => {
  const iconBgClass = colorMap[color] || 'bg-gray-300';

  console.log('SummaryCard: Rendering card:', { label, value, color });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 min-w-[200px] flex flex-col items-start gap-2 relative">
      <div className={`${iconBgClass} rounded-lg w-9 h-9 flex items-center justify-center text-white text-xl mb-2`}>
        {icon}
      </div>
      <div className="text-gray-500 font-medium text-sm">{label}</div>
      <div className="text-gray-900 font-bold text-2xl">{value}</div>
    </div>
  );
};

export default SummaryCard;
