import React from 'react';
import { IconBag, IconClock, IconStar, IconDollar } from './Icons';

const Filters: React.FC = () => {
  return (
    <div className="rs-filters">
      <div className="rs-filters__left">
        <div className="rs-filter-item"><IconBag /><span>Cuisine Type</span></div>
        <div className="rs-filter-item"><IconClock /><span>Delivery Time</span></div>
        <div className="rs-filter-item"><IconStar /><span>Rating</span></div>
        <div className="rs-filter-item"><IconDollar /><span>Price Range</span></div>
      </div>

      <div className="rs-offers">
        <div className="rs-offers__title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l2-4 2 4 4 2-4 2-2 4-2-4-4-2 4-2zM15 4l1-2 1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 14l.7-1.4.7 1.4 1.4.7-1.4.7-.7 1.4-.7-1.4-1.4-.7 1.4-.7z" fill="#111827" />
          </svg>
          <span>Special Offers</span>
        </div>
        <label className="rs-checkbox"><input type="checkbox" /><span>Free Delivery</span></label>
        <label className="rs-checkbox"><input type="checkbox" /><span>Open Now</span></label>
        <label className="rs-checkbox"><input type="checkbox" /><span>Promoted</span></label>
      </div>
    </div>
  );
};

export default Filters; 