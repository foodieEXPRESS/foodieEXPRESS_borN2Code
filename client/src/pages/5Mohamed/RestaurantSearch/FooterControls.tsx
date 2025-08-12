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
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-4">
      <div className="text-sm text-black" style={{fontFamily: 'var(--font-primary)', fontWeight: '700'}}>
        {resultsCount} 
        <span className='ml-2' style={{fontFamily: 'var(--font-primary)', fontWeight: '400', color: 'var(--color-secondary-gray)'}}> restaurants found</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600" style={{fontFamily: 'var(--font-primary)', fontWeight: '400', color: 'var(--color-secondary-gray)'}}>View:</span>
        <button
          className={`p-1.5 rounded-md transition-colors  ${
            view === 'grid'
              ? 'bg-[#4318D1] text-purple-600 border border-purple-200'
              : 'bg-[#4318D1] text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => handleViewChange('grid')}
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.62109 4.04207C3.62109 3.68845 3.76157 3.34931 4.01162 3.09926C4.26167 2.84922 4.60081 2.70874 4.95443 2.70874H6.28776C6.64138 2.70874 6.98052 2.84922 7.23057 3.09926C7.48062 3.34931 7.62109 3.68845 7.62109 4.04207V5.37541C7.62109 5.72903 7.48062 6.06817 7.23057 6.31822C6.98052 6.56826 6.64138 6.70874 6.28776 6.70874H4.95443C4.60081 6.70874 4.26167 6.56826 4.01162 6.31822C3.76157 6.06817 3.62109 5.72903 3.62109 5.37541V4.04207ZM10.2878 4.04207C10.2878 3.68845 10.4282 3.34931 10.6783 3.09926C10.9283 2.84922 11.2675 2.70874 11.6211 2.70874H12.9544C13.308 2.70874 13.6472 2.84922 13.8972 3.09926C14.1473 3.34931 14.2878 3.68845 14.2878 4.04207V5.37541C14.2878 5.72903 14.1473 6.06817 13.8972 6.31822C13.6472 6.56826 13.308 6.70874 12.9544 6.70874H11.6211C11.2675 6.70874 10.9283 6.56826 10.6783 6.31822C10.4282 6.06817 10.2878 5.72903 10.2878 5.37541V4.04207ZM3.62109 10.7087C3.62109 10.3551 3.76157 10.016 4.01162 9.76593C4.26167 9.51588 4.60081 9.37541 4.95443 9.37541H6.28776C6.64138 9.37541 6.98052 9.51588 7.23057 9.76593C7.48062 10.016 7.62109 10.3551 7.62109 10.7087V12.0421C7.62109 12.3957 7.48062 12.7348 7.23057 12.9849C6.98052 13.2349 6.64138 13.3754 6.28776 13.3754H4.95443C4.60081 13.3754 4.26167 13.2349 4.01162 12.9849C3.76157 12.7348 3.62109 12.3957 3.62109 12.0421V10.7087ZM10.2878 10.7087C10.2878 10.3551 10.4282 10.016 10.6783 9.76593C10.9283 9.51588 11.2675 9.37541 11.6211 9.37541H12.9544C13.308 9.37541 13.6472 9.51588 13.8972 9.76593C14.1473 10.016 14.2878 10.3551 14.2878 10.7087V12.0421C14.2878 12.3957 14.1473 12.7348 13.8972 12.9849C13.6472 13.2349 13.308 13.3754 12.9544 13.3754H11.6211C11.2675 13.3754 10.9283 13.2349 10.6783 12.9849C10.4282 12.7348 10.2878 12.3957 10.2878 12.0421V10.7087Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </button>
        <button
          className={`p-1.5 rounded-md transition-colors border border-gray-300 ${
            view === 'list'
              ? 'bg-purple-100 text-purple-600 border border-purple-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => handleViewChange('list')}
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.62109 4.04211H14.2878M3.62109 6.70878H14.2878M3.62109 9.37545H14.2878M3.62109 12.0421H14.2878" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </button>
      </div>
    </div>
  );
};

export default FooterControls; 