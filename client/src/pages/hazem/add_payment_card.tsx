import React, { useState } from 'react';
import type { AddPaymentCardProps } from './propsTypes';
import type { SavedCard, PaymentMethod } from './dataTypes';

// SVG icons for payment methods
const CardIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="#4318D1" strokeWidth="2"/><rect x="3" y="9" width="18" height="2" fill="#4318D1"/></svg>
);
const CashIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#4318D1" strokeWidth="2"/><circle cx="12" cy="12" r="2.5" stroke="#4318D1" strokeWidth="1.5"/></svg>
);
const WalletIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="2" stroke="#4318D1" strokeWidth="2"/><rect x="7" y="10" width="10" height="4" rx="1.5" stroke="#4318D1" strokeWidth="1.5"/></svg>
);
const CheckIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#10B981"/><path d="M6 10.5l2.5 2.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
);

const paymentMethods = [
  {
    key: 'card' as const,
    label: 'Credit/Debit Card',
    desc: 'Visa, Mastercard, Amex',
    icon: <CardIcon />,
  },
  {
    key: 'cash' as const,
    label: 'Cash on Delivery',
    desc: 'Pay when delivered',
    icon: <CashIcon />,
  },
  {
    key: 'wallet' as const,
    label: 'Digital Wallet',
    desc: 'PayPal, Apple Pay, etc.',
    icon: <WalletIcon />,
  },
];

const AddPaymentCard: React.FC<AddPaymentCardProps> = ({
  savedCards = [],
  selectedPaymentMethod = 'card',
  selectedCardId,
  onSelectCard,
  onAddNewCard,
  onCompletePayment,
  onSelectPaymentMethod,
}) => {
  // State for selected payment method and card
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(selectedPaymentMethod);
  const [selectedCard, setSelectedCard] = useState<string>(
    selectedCardId || savedCards.find((c) => c.isDefault)?.id || savedCards[0]?.id || ''
  );

  // Handle payment method change
  const handleMethodChange = (method: PaymentMethod) => {
    setSelectedMethod(method);
    onSelectPaymentMethod?.(method);
  };

  // Handle card selection
  const handleCardSelect = (id: string) => {
    setSelectedCard(id);
    onSelectCard?.(id);
  };

  // Card brand color and label
  const getCardBrand = (type: SavedCard['type']) => {
    if (type === 'visa') return { label: 'VISA', color: 'bg-[#1A237E] text-white' };
    if (type === 'mastercard') return { label: 'MC', color: 'bg-[#F87171] text-white' };
    return { label: 'AMEX', color: 'bg-[#E5E5E5] text-[#1A1A1A]' };
  };

  // Card display format
  const getCardDisplayNumber = (card: SavedCard) => {
    return `${card.type.charAt(0).toUpperCase() + card.type.slice(1)} ...... ${card.last4}`;
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 font-inter px-4 sm:px-8"
    //     style={{ 
    //     backgroundColor: '#ffffff',
    //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    //     maxWidth: '36rem',
    //     margin: '2rem auto',
    //     padding: '2rem',
    //     borderRadius: '1rem',
    //     fontFamily: 'Inter, sans-serif'
    // }}
    
    
    >
      {/* Header */}
      <h2 className="text-[24px] leading-[36px] font-bold mb-6 text-[#1A1A1A]">Payment Method</h2>

      {/* Payment Method Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {paymentMethods.map((m) => (
          <button
            key={m.key}
            className={`flex-1 flex flex-col items-center border rounded-md p-4 min-w-[120px] transition-all duration-150
              ${selectedMethod === m.key
                ? 'border-[#4318D1] shadow-md bg-white'
                : 'border-[#E5E5E5] bg-white hover:border-[#4318D1]'}
              focus:outline-none focus:ring-2 focus:ring-[#4318D1]`}
            onClick={() => handleMethodChange(m.key)}
            type="button"
            aria-selected={selectedMethod === m.key}
            aria-label={m.label}
          >
            <span className="mb-2">{m.icon}</span>
            <span className="font-semibold text-[#1A1A1A]">{m.label}</span>
            <span className="text-xs text-[#666666]">{m.desc}</span>
          </button>
        ))}
      </div>

      {/* Saved Cards Section */}
      {selectedMethod === 'card' && (
        <>
          <div className="mb-4">
            <h3 className="font-semibold text-[#1A1A1A] mb-2">Saved Cards</h3>
            <div className="flex flex-col gap-3">
              {savedCards.map((card) => {
                const brand = getCardBrand(card.type);
                return (
                  <button
                    key={card.id}
                    className={`flex items-center gap-4 border rounded-lg px-4 py-3 text-left transition-all duration-150
                      ${selectedCard === card.id
                        ? 'border-[#4318D1] bg-[#4318D1]/5'
                        : 'border-[#E5E5E5] bg-white hover:border-[#4318D1]'}
                      focus:outline-none focus:ring-2 focus:ring-[#4318D1]`}
                    onClick={() => handleCardSelect(card.id)}
                    type="button"
                    aria-selected={selectedCard === card.id}
                  >
                    <span className={`w-10 h-10 flex items-center justify-center rounded-full text-base font-bold ${brand.color}`}>
                      {brand.label}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-[#1A1A1A]">
                        {getCardDisplayNumber(card)}
                      </div>
                      <div className="text-xs text-[#666666]">Expires {card.expiry}</div>
                    </div>
                    {card.isDefault && (
                      <span className="ml-2 bg-[#10B981] text-white text-xs px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-2">
              <button
                className="text-[#4318D1] hover:underline flex items-center gap-1 text-sm font-medium"
                type="button"
                onClick={onAddNewCard}
              >
                <span className="text-lg font-bold">+</span> Use a different card
              </button>
            </div>
          </div>
        </>
      )}

      {/* Divider */}
      <hr className="my-6 border-[#E5E5E5]" />

      {/* Security Notice */}
      <div className="bg-[#FAFAFA] rounded-lg p-4 flex items-start gap-3 mb-6">
        <span className="mt-1"><CheckIcon /></span>
        <div>
          <div className="font-semibold text-[#1A1A1A]">Secure Payment</div>
          <div className="text-xs text-[#666666]">
            Your payment information is encrypted and secure. We never store your card details.
          </div>
        </div>
      </div>

      {/* Complete Payment Button */}
      <button
        className="w-full bg-[#4318D1] hover:bg-[#10B981] text-white font-semibold py-3 rounded-2xl text-lg shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
        type="button"
        onClick={onCompletePayment}
      >
        <span className="inline-flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 20 20" className="inline-block"><rect x="3" y="7" width="14" height="6" rx="2" fill="#fff"/><rect x="3" y="7" width="14" height="6" rx="2" stroke="#fff" strokeWidth="1.5"/><rect x="3" y="7" width="14" height="6" rx="2" stroke="#4318D1" strokeWidth="1.5"/></svg>
          Complete Payment
        </span>
      </button>
    </div>
  );
};

export default AddPaymentCard;