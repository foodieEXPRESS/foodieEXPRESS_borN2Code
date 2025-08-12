import React from 'react';

const Filters: React.FC = () => {
  console.log('Filters: Component loaded');

  const handleFilterChange = (filterType: string, value: string) => {
    console.log('Filters: Filter changed:', filterType, value);
  };

  return (
    <div className="flex w-full items-start justify-between">
      {/* Left group of filters */}
      <div className="flex items-center gap-16">

        {/* cuisine type */}
        <div className="flex items-center gap-2">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.7879 9.20878H5.12126M16.7879 9.20878C17.23 9.20878 17.6539 9.38438 17.9664 9.69694C18.279 10.0095 18.4546 10.4334 18.4546 10.8754V15.8754C18.4546 16.3175 18.279 16.7414 17.9664 17.054C17.6539 17.3665 17.23 17.5421 16.7879 17.5421H5.12126C4.67923 17.5421 4.25531 17.3665 3.94275 17.054C3.63018 16.7414 3.45459 16.3175 3.45459 15.8754V10.8754C3.45459 10.4334 3.63018 10.0095 3.94275 9.69694C4.25531 9.38438 4.67923 9.20878 5.12126 9.20878M16.7879 9.20878V7.54211C16.7879 7.10009 16.6123 6.67616 16.2998 6.3636C15.9872 6.05104 15.5633 5.87545 15.1213 5.87545M5.12126 9.20878V7.54211C5.12126 7.10009 5.29685 6.67616 5.60941 6.3636C5.92197 6.05104 6.3459 5.87545 6.78792 5.87545M15.1213 5.87545V4.20878C15.1213 3.76675 14.9457 3.34283 14.6331 3.03027C14.3205 2.71771 13.8966 2.54211 13.4546 2.54211H8.45459C8.01256 2.54211 7.58864 2.71771 7.27608 3.03027C6.96352 3.34283 6.78792 3.76675 6.78792 4.20878V5.87545M15.1213 5.87545H6.78792" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span className="text-sm font-medium text-black "style={{fontFamily: 'var(--font-primary)',fontWeight: '600'}}>Cuisine Type</span>
        </div>

        {/* delivery time */}
        <div className="flex items-center gap-2">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9546 6.70878V10.0421L13.4546 12.5421M18.4546 10.0421C18.4546 11.027 18.2606 12.0023 17.8837 12.9122C17.5068 13.8222 16.9543 14.649 16.2579 15.3454C15.5615 16.0419 14.7347 16.5943 13.8247 16.9712C12.9148 17.3481 11.9395 17.5421 10.9546 17.5421C9.96968 17.5421 8.99441 17.3481 8.08446 16.9712C7.17452 16.5943 6.34773 16.0419 5.65129 15.3454C4.95485 14.649 4.4024 13.8222 4.02549 12.9122C3.64858 12.0023 3.45459 11.027 3.45459 10.0421C3.45459 8.05299 4.24477 6.14534 5.65129 4.73881C7.05781 3.33229 8.96547 2.54211 10.9546 2.54211C12.9437 2.54211 14.8514 3.33229 16.2579 4.73881C17.6644 6.14534 18.4546 8.05299 18.4546 10.0421Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span className="text-sm font-medium text-black "style={{fontFamily: 'var(--font-primary)',fontWeight: '600'}}>Delivery Time</span>
        </div>

        {/* rating */}
        <div className="flex items-center gap-2">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.9544 1.70874L13.5294 6.92541L19.2878 7.54207L15.1211 12.3254L16.1044 17.5587L10.9544 14.8504L5.80443 17.5587L6.78776 12.3254L2.62109 7.54207L8.37943 6.92541L10.9544 1.70874Z" fill="black"/>
                </svg>
          <span className="text-sm font-medium text-black"style={{fontFamily: 'var(--font-primary)',fontWeight: '600'}}>Rating</span>
        </div>

        {/* price range */}
        <div className="flex items-center gap-2">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9546 6.70882C9.57376 6.70882 8.45459 7.45465 8.45459 8.37549C8.45459 9.29632 9.57376 10.0422 10.9546 10.0422C12.3354 10.0422 13.4546 10.788 13.4546 11.7088C13.4546 12.6297 12.3354 13.3755 10.9546 13.3755M10.9546 6.70882C11.8796 6.70882 12.6879 7.04382 13.1204 7.54215M10.9546 6.70882V5.87549M10.9546 6.70882V13.3755M10.9546 13.3755V14.2088M10.9546 13.3755C10.0296 13.3755 9.22126 13.0405 8.78876 12.5422" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span className="text-sm font-medium text-black"style={{fontFamily: 'var(--font-primary)',fontWeight: '600'}}>Price Range</span>
        </div>
      </div>

      {/* Special Offers Filter on the right */}
      <div className=" flex flex-col ">
        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-black" style={{fontFamily: 'var(--font-primary)',fontWeight: '600'}}>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.12126 2.54211V5.87545M3.45459 4.20878H6.78792M5.95459 14.2088V17.5421M4.28792 15.8754H7.62126M11.7879 2.54211L13.6929 8.25628L18.4546 10.0421L13.6929 11.8279L11.7879 17.5421L9.88292 11.8279L5.12126 10.0421L9.88292 8.25628L11.7879 2.54211Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          Special Offers
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 justify-self-start ">
            <input
              type="checkbox"
              id="free-delivery"
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              onChange={(e) => handleFilterChange('free-delivery', e.target.checked.toString())}
            />
            <label htmlFor="free-delivery" className="text-sm  cursor-pointer" style={{fontFamily: 'var(--font-primary)',fontWeight: '400',color: 'var(--color-secondary-gray)'}}>
              Free Delivery
            </label>
          </div>
          <div className="flex items-center gap-2 justify-self-start">
            <input
              type="checkbox"
              id="open-now"
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 "
              onChange={(e) => handleFilterChange('open-now', e.target.checked.toString())}
            />
            <label htmlFor="open-now" className="text-sm text-gray-600 cursor-pointer" style={{fontFamily: 'var(--font-primary)',fontWeight: '400',color: 'var(--color-secondary-gray)'}}>
              Open Now
            </label>
          </div>
          <div className="flex items-center gap-2 justify-self-start">
            <input
              type="checkbox"
              id="promoted"
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              onChange={(e) => handleFilterChange('promoted', e.target.checked.toString())}
            />
            <label htmlFor="promoted" className="text-sm text-gray-600 cursor-pointer"style={{fontFamily: 'var(--font-primary)',fontWeight: '400',color: 'var(--color-secondary-gray)'}}>
              Promoted
            </label>
          </div>
        </div>
      </div>
      </div>

  );
};

export default Filters; 