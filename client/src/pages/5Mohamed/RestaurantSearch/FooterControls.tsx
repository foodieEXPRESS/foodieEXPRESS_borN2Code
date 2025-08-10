import React from 'react';

interface FooterControlsProps {
  resultsCount: number;
  view: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
}

const FooterControls: React.FC<FooterControlsProps> = ({ resultsCount, view, onChange }) => {
  console.log('FooterControls: Component loaded with view:', view);

  const handleViewChange = (newView: 'grid' | 'list') => {
    console.log('FooterControls: View changed to:', newView);
    onChange(newView);
  };

  return (
    <div className="rs-footer">
      <div className="rs-results">
        Showing <span className="rs-results__num">{resultsCount}</span> results
      </div>
      <div className="rs-view">
        <span className="rs-view__label">View:</span>
        <button 
          className={`rs-view__btn ${view === 'grid' ? 'is-active' : ''}`}
          onClick={() => handleViewChange('grid')}
        >
          ⊞
        </button>
        <button 
          className={`rs-view__btn ${view === 'list' ? 'is-active' : ''}`}
          onClick={() => handleViewChange('list')}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default FooterControls; 