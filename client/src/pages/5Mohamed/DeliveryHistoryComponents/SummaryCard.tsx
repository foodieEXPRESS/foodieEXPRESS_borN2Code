import React from 'react';

// ============================================================================
// SUMMARY CARD COMPONENT
// ============================================================================

interface DeliverySummaryCard {
  icon: string;
  label: string;
  value: string;
  color: string;
}

const SummaryCard: React.FC<DeliverySummaryCard> = ({ icon, label, value, color }) => {
  const getIconClass = (color: string) => {
    switch (color) {
      case '#22c55e': return 'MA__icon-green';
      case '#6366f1': return 'MA__icon-purple';
      case '#f43f5e': return 'MA__icon-red';
      case '#fbbf24': return 'MA__icon-orange';
      default: return '';
    }
  };

  return (
    <div className="MA__summary-card">
      <div className={`MA__summary-icon ${getIconClass(color)}`}>{icon}</div>
      <div className="MA__summary-label">{label}</div>
      <div className="MA__summary-value">{value}</div>
    </div>
  );
};

export default SummaryCard; 