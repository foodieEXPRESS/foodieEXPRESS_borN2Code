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
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
      <div className="text-sm text-black">
        {resultsCount} restaurants found
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">View:</span>
        <button 
          className={`p-2 rounded-lg transition-colors ${
            view === 'grid' 
              ? 'bg-purple-100 text-purple-600 border border-purple-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => handleViewChange('grid')}
        >
          ⊞
        </button>
        <button 
          className={`p-2 rounded-lg transition-colors ${
            view === 'list' 
              ? 'bg-purple-100 text-purple-600 border border-purple-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => handleViewChange('list')}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default FooterControls; 