import React from 'react';

interface FooterControlsProps {
  resultsCount: number;
  view: 'grid' | 'list';
  onChange: (v: 'grid' | 'list') => void;
}

const FooterControls: React.FC<FooterControlsProps> = ({ resultsCount, view, onChange }) => {
  return (
    <div className="rs-footer">
      <div className="rs-results"><span className="rs-results__num">{resultsCount}</span> restaurants found</div>
      <div className="rs-view">
        <span className="rs-view__label">View:</span>
        <button
          onClick={() => onChange('grid')}
          className={`rs-view__btn ${view === 'grid' ? 'is-active' : ''}`}
          aria-label="Grid view"
        >
          ▦
        </button>
        <button
          onClick={() => onChange('list')}
          className={`rs-view__btn ${view === 'list' ? 'is-active' : ''}`}
          aria-label="List view"
        >
          ≡
        </button>
      </div>
    </div>
  );
};

export default FooterControls; 