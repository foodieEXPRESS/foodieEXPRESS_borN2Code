import React from 'react';
import Header from '../../components/Header';
import type { OrderBeforePaymentProps } from './propsTypes';

const OrderBeforePayment: React.FC<Partial<OrderBeforePaymentProps>> = ({
  restaurantName = 'Bella Italia',
  itemCount = 5,
  deliveryInfo = {
    address: '123 Main Street, Downtown',
    estimatedTime: '25-35 minutes',
    fastestTime: '25 min'
  },
  orderItems = [],
  orderSummary = {
    subtotal: 73.95,
    deliveryFee: 2.99,
    serviceFee: 1.5,
    tax: 6.47,
    total: 84.91
  },
  onAddMoreItems = () => {},
  onAddPromoCode = () => {},
  onChangeAddress = () => {},
  onProceedToCheckout = () => {}
}) => {
  const hasItems = orderItems && orderItems.length > 0;

  return (
    <div className="min-h-screen bg-secondary-lighter">
      <Header />

      <div className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-secondary-dark mb-1">Your Cart</h1>
              <p className="text-secondary-gray text-base md:text-lg">
                {itemCount} items from {restaurantName}
              </p>
            </div>

            {/* ETA card */}
            <div className="bg-primary-alt rounded-lg p-5 md:p-6 text-white shadow-success">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-alt rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-alt" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-0.5">Estimated Delivery Time</p>
                    <p className="text-sm opacity-90">{deliveryInfo.estimatedTime} to {deliveryInfo.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold leading-none">{deliveryInfo.fastestTime}</p>
                  <p className="text-sm opacity-90 mt-1">Fastest</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <svg className="w-5 h-5 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-xl font-bold text-secondary-dark">Order Items</h2>
              </div>

              {hasItems ? (
                <div className="divide-y divide-secondary-light">
                  {orderItems.map((item) => (
                    <div key={item.id} className="py-4 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-secondary-dark text-base md:text-lg">{item.name}</p>
                        <p className="text-secondary-gray text-sm mt-1">Qty {item.quantity}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="text-secondary-gray text-xs">${item.price.toFixed(2)} each</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="min-h-[280px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-secondary-gray text-lg">Your cart is empty</p>
                    <p className="text-secondary-gray text-sm mt-1">Add some delicious items to get started</p>
                  </div>
                </div>
              )}

              {/* Add more items */}
              <div className="pt-6 border-t border-secondary-light">
                <button onClick={onAddMoreItems} className="text-primary hover:text-primary-alt font-medium text-lg transition-colors">
                  + Add more items
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 sticky top-8">
              <h2 className="text-xl font-bold text-secondary-dark">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-secondary-gray">
                  <span>Subtotal</span>
                  <span className="font-semibold">${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-secondary-gray">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">${orderSummary.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-secondary-gray">
                  <span>Service Fee</span>
                  <span className="font-semibold">${orderSummary.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-secondary-gray">
                  <span>Tax</span>
                  <span className="font-semibold">${orderSummary.tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo */}
              <div>
                <button
                  onClick={onAddPromoCode}
                  className="w-full flex items-center justify-start gap-3 border border-secondary-light rounded-lg px-4 py-3 text-secondary-gray hover:text-secondary-dark hover:border-secondary-gray transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="font-medium">Add promo code</span>
                </button>
              </div>

              <div className="border-t border-secondary-light pt-4">
                <div className="flex justify-between text-lg font-bold text-secondary-dark">
                  <span>Total</span>
                  <span className="text-primary">${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-secondary-lighter rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-secondary-gray mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-secondary-dark mb-1">Delivery Address</p>
                    <p className="text-secondary-gray text-sm mb-3">{deliveryInfo.address}</p>
                    <button onClick={onChangeAddress} className="text-primary hover:text-primary-alt text-sm font-medium transition-colors">
                      Change address
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-primary text- py-4 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-lg shadow-sm"
              >
                Proceed to Checkout
              </button>

              <div className="text-center pt-1">
                <p className="text-secondary-gray text-sm">Estimated delivery time</p>
                <p className="text-primary-alt font-medium text-lg">{deliveryInfo.estimatedTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBeforePayment;
