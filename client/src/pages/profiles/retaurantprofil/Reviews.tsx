import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import type { RootState } from '../../../store';
import { fetchReviews } from '../../../store/restaurantProfileSlice';
import './restaurantprofile.css';

const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { reviews: reviewsState, reviewsLoading, error } = useSelector((s: RootState) => s.restaurantProfile);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    dispatch(fetchReviews({ page, limit }));
  }, [dispatch, page, limit]);

  const averageRating = useMemo(() => {
    if (typeof reviewsState.averageRating === 'number') return reviewsState.averageRating;
    const list = reviewsState.items || [];
    if (!list.length) return 0;
    const sum = list.reduce((acc, r) => acc + (r.rating ?? 0), 0);
    return sum / list.length;
  }, [reviewsState.averageRating, reviewsState.items]);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="machraoui-star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`machraoui-star ${star <= rating ? '' : 'empty'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="machraoui-reviews-container">
      {/* Top Navigation Bar */}
      <div className="machraoui-top-bar">
        <div className="machraoui-logo-container">
          <div className="machraoui-logo-icon"></div>
          <div className="machraoui-logo-text">
            FoodieExpress
            <span className="machraoui-help-text">help</span>
          </div>
        </div>
        <button className="machraoui-settings-btn">Settings</button>
      </div>

      {/* Restaurant Information Card */}
      <div className="machraoui-restaurant-card">
        {/* Navigation Tabs */}
        <div className="machraoui-navigation-tabs">
          <button 
            className="machraoui-nav-tab" 
            onClick={() => handleNavigation('/restaurant-profile')}
          >
            Orders
          </button>
          <button 
            className="machraoui-nav-tab" 
            onClick={() => handleNavigation('/menu-management')}
          >
            Menu Management
          </button>
          <button 
            className="machraoui-nav-tab" 
            onClick={() => handleNavigation('/earnings-reports')}
          >
            Earnings
          </button>
          <button 
            className="machraoui-nav-tab active" 
            onClick={() => handleNavigation('/reviews')}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="machraoui-reviews-card">
        <div className="machraoui-reviews-header">
          <h1 className="machraoui-reviews-title">Customer Reviews</h1>
          <div className="machraoui-reviews-subtitle">
            View and respond to customer feedback and ratings
          </div>
        </div>

        {/* Rating summary */}
        <div className="machraoui-rating-display">
          {reviewsLoading && (
            <div className="machraoui-loading-state">Loading reviews...</div>
          )}
          {error && (
            <div className="machraoui-error-state">{error}</div>
          )}
          {!reviewsLoading && !error && (
            <>
              <div className="machraoui-rating-number">{averageRating.toFixed(1)}</div>
              <div className="machraoui-rating-text">Based on {reviewsState.total} reviews</div>
            </>
          )}
        </div>

        {/* Reviews list */}
        {!reviewsLoading && !error && (
          <div className="machraoui-reviews-list">
            {reviewsState.items.length > 0 ? (
              reviewsState.items.map((rv) => (
                <div key={rv.id} className="machraoui-review-item">
                  <div className="machraoui-review-header">
                    <div className="machraoui-review-author">
                      {rv.user?.fullName ?? 'Anonymous'}
                    </div>
                    <div className="machraoui-review-date">
                      {rv.createdAt ? new Date(rv.createdAt).toLocaleDateString() : 'Invalid Date'}
                    </div>
                  </div>
                  <div className="machraoui-review-rating">
                    <span className="machraoui-review-rating-value">{rv.rating}/5</span>
                  </div>
                  <StarRating rating={rv.rating} />
                  {rv.comment && (
                    <div className="machraoui-review-comment">{rv.comment}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="machraoui-empty-state">
                <div className="machraoui-empty-state-icon">📝</div>
                <div className="machraoui-empty-state-text">No reviews yet</div>
                <div className="machraoui-empty-state-subtext">
                  Customer reviews will appear here once they start rating your restaurant
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!reviewsLoading && reviewsState.totalPages > 1 && (
          <div className="machraoui-pagination-container">
            <button
              className="machraoui-view-reviews-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="machraoui-pagination-info">
              Page {reviewsState.page} of {reviewsState.totalPages}
            </div>
            <button
              className="machraoui-view-reviews-btn"
              onClick={() => setPage((p) => Math.min(reviewsState.totalPages, p + 1))}
              disabled={page === reviewsState.totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;