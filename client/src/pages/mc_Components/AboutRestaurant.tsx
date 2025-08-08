import React from "react";
import type { AboutCardProps } from '../../types/mc_Components';

export const AboutRestaurant: React.FC<AboutCardProps> = ({
  description,
  rating,
  deliveryTime,
  deliveryFee,
  address,
  phone,
}) => (
  <div
    className="rounded-lg shadow-md p-6 w-full"
    style={{ background: "#FFFFFF" }}
  >
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
        {description || "No description provided."}
      </p>

      {/* Values with labels below */}
     <div className="flex flex-row gap-6">
  <div className="flex flex-col items-center">
    <span
      className="font-inter font-bold text-2xl leading-[36px] text-center"
      style={{ color: "#4318D1" }}
    >
      {rating !== undefined && rating !== null ? rating.toFixed(2) : "N/A"}
    </span>
    <span
      className="font-inter font-normal text-xs leading-[18px] text-center"
    >
      Rating
    </span>
  </div>

  <div className="flex flex-col items-center">
    <span
      className="font-inter font-bold text-2xl leading-[36px] text-center"
      style={{ color: "#10B981" }}
    >
      {deliveryTime || "N/A"}
    </span>
    <span
      className="font-inter font-normal text-xs leading-[18px] text-center"
    >
      Delivery Time
    </span>
  </div>

  <div className="flex flex-col items-center">
    <span
      className="font-inter font-bold text-2xl leading-[36px] text-center"
      style={{ color: "#F59E0B" }}
    >
      {deliveryFee || "N/A"}
    </span>
    <span
      className="font-inter font-normal text-xs leading-[18px] text-center"
    >
      Delivery Fee
    </span>
  </div>
</div>
    </div>

    {/* Address and phone with icons side by side */}
    <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-sm mt-3">
      <span className="flex items-center gap-1">
        {/* Location Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <strong>Address:</strong> {address || "N/A"}
      </span>

      <span className="flex items-center gap-1">
        {/* Phone Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
        <strong>Phone:</strong> {phone || "N/A"}
      </span>
    </div>
  </div>
);
