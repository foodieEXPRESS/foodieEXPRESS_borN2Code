import React from 'react';

const Filters: React.FC = () => {
  console.log('Filters: Component loaded');

  const handleFilterChange = (filterType: string, value: string) => {
    console.log('Filters: Filter changed:', filterType, value);
  };

  return (
    <div className="rs-filters">
      <div className="rs-filters__left">
        <div className="rs-filter-item">
          <input 
            type="checkbox" 
            id="delivery" 
            onChange={(e) => handleFilterChange('delivery', e.target.checked.toString())}
          />
          <label htmlFor="delivery">Free Delivery</label>
        </div>
        <div className="rs-filter-item">
          <input 
            type="checkbox" 
            id="promoted" 
            onChange={(e) => handleFilterChange('promoted', e.target.checked.toString())}
          />
          <label htmlFor="promoted">Promoted</label>
        </div>
        <div className="rs-filter-item">
          <input 
            type="checkbox" 
            id="open" 
            onChange={(e) => handleFilterChange('open', e.target.checked.toString())}
          />
          <label htmlFor="open">Open Now</label>
        </div>
      </div>
      <div className="rs-offers">
        <div className="rs-offers__title">
          <span>🎯</span>
          Special Offers
        </div>
        <div className="rs-checkbox">
          <input 
            type="checkbox" 
            id="discount" 
            onChange={(e) => handleFilterChange('discount', e.target.checked.toString())}
          />
          <label htmlFor="discount">Discounts</label>
        </div>
        <div className="rs-checkbox">
          <input 
            type="checkbox" 
            id="deals" 
            onChange={(e) => handleFilterChange('deals', e.target.checked.toString())}
          />
          <label htmlFor="deals">Deals</label>
        </div>
      </div>
    </div>
  );
};

export default Filters; 