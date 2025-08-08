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
    <h3 className="text-xl font-semibold mb-2">About Us</h3>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <p className="text-base text-gray-700 mb-3 md:mb-0">{description || "No description provided."}</p>
      <div className="flex flex-row gap-6">
        <span className="text-sm"><strong>Rating:</strong> {rating ?? "N/A"}</span>
        <span className="text-sm"><strong>Delivery Time:</strong> {deliveryTime || "N/A"}</span>
        <span className="text-sm"><strong>Delivery Fee:</strong> {deliveryFee || "N/A"}</span>
      </div>
    </div>

    {/* Address and phone side by side */}
    <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-sm mt-3">
      <span><strong>Address:</strong> {address || "N/A"}</span>
      <span><strong>Phone:</strong> {phone || "N/A"}</span>
    </div>
  </div>
);
