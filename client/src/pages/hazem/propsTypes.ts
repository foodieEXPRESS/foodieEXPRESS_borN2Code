import type { CartItem, OrderSummary, OrderItem, DeliveryInfo } from './dataTypes';

export interface CartViewProps {
  items: CartItem[];
  orderSummary: OrderSummary;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export interface OrderBeforePaymentProps {
  restaurantName: string;
  itemCount: number;
  deliveryInfo: DeliveryInfo;
  orderItems: OrderItem[];
  orderSummary: OrderSummary;
  onAddMoreItems?: () => void;
  onAddPromoCode?: () => void;
  onChangeAddress?: () => void;
  onProceedToCheckout?: () => void;
}