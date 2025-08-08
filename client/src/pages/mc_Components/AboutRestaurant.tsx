import React from "react";
import type { AboutCardProps } from '../../types/mc_Components';
// Define the interface here (or import it if you want)

// Dummy data for About section
export const aboutCardData: AboutCardProps = {
  description: "Enjoy authentic Italian cuisine made with fresh ingredients and love.",
  rating: 4.8,
  deliveryTime: "25-35 min",
  deliveryFee: "$2.99",
  address: "123 Main Street, Downtown",
  phone: "(555) 123-4567",
};

export const AboutRestaurant: React.FC<AboutCardProps> = ({
  description,
  rating,
  deliveryTime,
  deliveryFee,
  address,
  phone,
}) => (
  <div className="bg-white text-gray-900 rounded-lg shadow-md p-6 w-full">
    <h3 className="text-xl font-semibold">About Us</h3>
    <p className="text-sm">{description}</p>
    <ul className="text-sm space-y-1">
      <li><strong>Rating:</strong> {rating}</li>
      <li><strong>Delivery Time:</strong> {deliveryTime}</li>
      <li><strong>Delivery Fee:</strong> {deliveryFee}</li>
      <li><strong>Address:</strong> {address}</li>
      <li><strong>Phone:</strong> {phone}</li>
    </ul>
  </div>
);