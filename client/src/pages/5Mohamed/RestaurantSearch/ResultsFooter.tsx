import React from 'react';

interface ResultsFooterProps {
  selectedView: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
}

const ResultsFooter: React.FC<ResultsFooterProps> = ({ selectedView, onChange }) => (
  <div className="MA__search-footer">
    <div className="MA__results-count">
      <span className="MA__results-text">8 restaurants found</span>
    </div>
    <div className="MA__view-options">
      <span className="MA__view-label">View:</span>
      <button 
        className={`MA__view-btn ${selectedView === 'grid' ? 'MA__view-active' : ''}`}
        onClick={() => onChange('grid')}
      >
        <span className="MA__view-icon">⊞</span>
      </button>
      <button 
        className={`MA__view-btn ${selectedView === 'list' ? 'MA__view-active' : ''}`}
        onClick={() => onChange('list')}
      >
        <span className="MA__view-icon">☰</span>
      </button>
    </div>
  </div>
);

export default ResultsFooter; 