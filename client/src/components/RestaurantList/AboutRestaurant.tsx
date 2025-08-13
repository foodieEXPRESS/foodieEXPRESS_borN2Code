import React, { useState } from "react";
import type { AboutCardProps } from '../../types/mc_Types';
import axios from "axios";

export const AboutRestaurant: React.FC<AboutCardProps & { restaurantId?: string }> = ({
  description,
  rating,
  deliveryTime,
  deliveryFee,
  address,
  contactPhone,
  restaurantId,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = async () => {
    if (!reviewRating || reviewRating < 0 || reviewRating > 5) {
      return alert("Rating must be 0–5");
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/details/review/${restaurantId}`,
        { rating: reviewRating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review added successfully!");
      setShowReviewForm(false);
      setReviewRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="rounded-lg shadow-md p-6 w-full" style={{ background: "#FFFFFF" }}>
      {/* === Original AboutRestaurant content === */}
      <h3
        className="mb-2"
        style={{
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: "24px",
          lineHeight: "36px",
          letterSpacing: "0%",
          color: "#1A1A1A",
        }}
      >
        About Us
      </h3>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-base text-gray-700 mb-3 md:mb-0">
          {description || "Welcome to our restaurant, where great food meets a welcoming atmosphere. ..."}
        </p>

        {/* Values with labels below */}
        <div className="flex flex-row gap-6">
          <div className="flex flex-col items-center">
            <span
              className="font-inter font-bold text-2xl leading-[36px] text-center"
              style={{ color: "#4318D1" }}
            >
              {rating !== undefined ? rating.toFixed(1) : "N/A"}
            </span>
            <span className="font-inter font-normal text-xs leading-[18px] text-center">
              Rating
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span
              className="font-inter font-bold text-2xl leading-[36px] text-center"
              style={{ color: "#10B981" }}
            >
              {deliveryTime || "25-35"}
            </span>
            <span className="font-inter font-normal text-xs leading-[18px] text-center">
              Delivery Time
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span
              className="font-inter font-bold text-2xl leading-[36px] text-center"
              style={{ color: "#F59E0B" }}
            >
              {deliveryFee || "$2.99"}
            </span>
            <span className="font-inter font-normal text-xs leading-[18px] text-center">
              Delivery Fee
            </span>
          </div>
        </div>
      </div>

      {/* Address and phone */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-sm mt-3">
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <strong>Address:</strong> {address || "Street Name, City, Country"}
        </span>

        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          <strong>Phone:</strong> {contactPhone || "N/A"}
        </span>
      </div>

      {/* === Review Button & Form === */}
      <button
        onClick={() => setShowReviewForm(true)}
        className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Review
      </button>

     {showReviewForm && (
  <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative animate-fadeIn">
      {/* Close button */}
      <button
        onClick={() => setShowReviewForm(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-lg"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add / Update Review</h2>

      {/* Star rating */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setReviewRating(star)}
            className={`text-3xl transition-colors mr-1 ${
              star <= reviewRating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        rows={4}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowReviewForm(false)}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitReview}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400"
          disabled={reviewRating === 0}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};
