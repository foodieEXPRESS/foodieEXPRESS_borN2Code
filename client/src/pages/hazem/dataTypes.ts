export interface CartItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  quantity: number;
  customizations?: string[];
}

export interface OrderSummary {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  total: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface DeliveryInfo {
  address: string;
  estimatedTime: string;
  fastestTime: string;
}