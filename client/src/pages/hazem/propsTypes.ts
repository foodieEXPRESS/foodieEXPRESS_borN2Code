import type { CartItem, OrderSummary, OrderItem, DeliveryInfo, CheckoutFormData, CheckoutStep } from './dataTypes';

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

export interface CheckoutProps {
  initialStep?: CheckoutStep;
  initialValues?: Partial<CheckoutFormData>;
  onSubmit?: (values: CheckoutFormData) => void;
  onStepChange?: (step: CheckoutStep) => void;
}

export interface AddPaymentCardProps {
  savedCards?: import('./dataTypes').SavedCard[];
  selectedPaymentMethod?: import('./dataTypes').PaymentMethod;
  selectedCardId?: string;
  onSelectCard?: (id: string) => void;
  onAddNewCard?: () => void;
  onCompletePayment?: () => void;
  onSelectPaymentMethod?: (method: import('./dataTypes').PaymentMethod) => void;
}