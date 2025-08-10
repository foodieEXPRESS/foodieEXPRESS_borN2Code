/**
 * File: client/src/component/FeaturesGrid.tsx
 * Purpose: Highlights key app features in a grid.
 * Used by: `client/src/App.tsx` when current view is 'home'.
 * Styles: See `.MA__features-*` rules in `client/src/styles.css`.
 */
import React from 'react';

const FeaturesGrid: React.FC = () => {
  return (
    <>
      {/* Testimonials Section */}
      <section className="MA__testimonials-section">
        <div className="MA__container">
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied customers who trust us for their daily meals.</p>
          
          <div className="MA__testimonial-card">
            <div className="MA__testimonial-header">
              <div className="MA__avatar">SJ</div>
              <div className="MA__customer-info">
                <h4>Sarah Johnson</h4>
                <div className="MA__stars">
                  <span className="MA__star">★</span>
                  <span className="MA__star">★</span>
                  <span className="MA__star">★</span>
                  <span className="MA__star">★</span>
                  <span className="MA__star">★</span>
                </div>
              </div>
            </div>
            <p className="MA__testimonial-text">
              Amazing food quality and super fast delivery! My go-to app for ordering meals.
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Order Section */}
      <section className="MA__ready-to-order">
        <div className="MA__container">
          <h2>Ready to Order?</h2>
          <p>Join millions of food lovers and get your favorite meals delivered fresh and fast.</p>
          
          <div className="MA__cta-buttons">
            <button className="MA__start-ordering-btn">Start Ordering</button>
            <button className="MA__download-app-btn">Download App</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesGrid;