import React from 'react';

const SearchControls: React.FC = () => {
  console.log('SearchControls: Component loaded');



  const handleLocationChange = () => {
    console.log('SearchControls: Location changed');
  };

  return (
    <div className="flex flex-col md:flex-row  gap-3 items-stretch md:items-center">
      <div className="relative flex-1">
        <svg className='absolute left-3 top-1/2 -translate-y-1/2' width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.4546 17.5421L13.4546 12.5421M15.1213 8.37545C15.1213 9.14149 14.9704 9.90004 14.6772 10.6078C14.3841 11.3155 13.9544 11.9586 13.4127 12.5002C12.871 13.0419 12.228 13.4716 11.5202 13.7647C10.8125 14.0579 10.054 14.2088 9.28792 14.2088C8.52188 14.2088 7.76334 14.0579 7.0556 13.7647C6.34787 13.4716 5.70481 13.0419 5.16313 12.5002C4.62146 11.9586 4.19178 11.3155 3.89863 10.6078C3.60547 9.90004 3.45459 9.14149 3.45459 8.37545C3.45459 6.82835 4.06917 5.34462 5.16313 4.25066C6.2571 3.1567 7.74083 2.54211 9.28792 2.54211C10.835 2.54211 12.3188 3.1567 13.4127 4.25066C14.5067 5.34462 15.1213 6.82835 15.1213 8.37545Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <input
          type="search"
          className="w-full pl-10  pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          placeholder="Search restaurants, cuisines, or dishes..."
        />
      </div>
      <button
        className="px-4 py-2.5 border border-gray-300 rounded-md flex items-center justify-center gap-2  text-sm" style={{ backgroundColor: 'var(--color-secondary-light)',fontFamily: 'var(--font-primary)' , fontWeight: '400' }}
        onClick={handleLocationChange}
      >
        Choose option...
        <span className="text-gray-500 text-xs">▼</span>
      </button>
    </div>
  );
};

export default SearchControls; 