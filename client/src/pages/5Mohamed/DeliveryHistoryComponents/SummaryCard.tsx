import React from 'react';

interface DeliverySummaryCard {
  icon: string;
  label: string;
  value: string;
  color: string;
}

const SummaryCard: React.FC<DeliverySummaryCard> = ({ icon, label, value, color }) => {
  const getIconClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      '#22c55e': 'MA__icon-green',
      '#6366f1': 'MA__icon-purple', 
      '#f43f5e': 'MA__icon-red',
      '#fbbf24': 'MA__icon-orange'
    };
    return colorMap[color] || '';
  };

  console.log('SummaryCard: Rendering card:', { label, value, color });

  return (
    <div className="MA__summary-card">
      <div className={`MA__summary-icon ${getIconClass(color)}`}>{icon}</div>
      <div className="MA__summary-label">{label}</div>
      <div className="MA__summary-value">{value}</div>
    </div>
  );
};

export default SummaryCard; 