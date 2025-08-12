

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

// Checkout types
export type CheckoutStep = 'delivery' | 'payment' | 'review';

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  zipCode: string;
  deliveryInstructions?: string;
  // Payment
  paymentMethod: 'card' | 'cash' | 'wallet';
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string; // MM/YY
  cardCvc?: string;
  savedCardId?: string; // New: selected saved card
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;

// Payment method type
export type PaymentMethod = 'card' | 'cash' | 'wallet';

// Saved card type
export interface SavedCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiry: string; // MM/YY
  isDefault?: boolean;
}