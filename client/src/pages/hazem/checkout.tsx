import React, { useMemo, useState } from 'react';
import type { CheckoutFormData, CheckoutStep, CheckoutFormErrors } from './dataTypes';
import type { CheckoutProps } from './propsTypes';

// Italiana font for logo (ensure it's loaded in your project)
const Logo = () => (
  <span className="font-italiana text-[1.7rem] tracking-tight text-[#1A1A1A]">FoodieExpress</span>
);

const steps: Array<{ key: CheckoutStep; label: string; number: number }> = [
  { key: 'delivery', label: 'Delivery Info', number: 1 },
  { key: 'payment', label: 'Payment', number: 2 },
  { key: 'review', label: 'Review', number: 3 }
];

const defaultValues: CheckoutFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  streetAddress: '',
  apartment: '',
  city: '',
  zipCode: '',
  deliveryInstructions: '',
  paymentMethod: 'card',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: ''
};

const Checkout: React.FC<CheckoutProps> = ({
  initialStep = 'delivery',
  initialValues = {},
  onSubmit = () => {},
  onStepChange
}) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(initialStep);
  const [form, setForm] = useState<CheckoutFormData>({ ...defaultValues, ...initialValues });
  const [errors, setErrors] = useState<CheckoutFormErrors>({});

  const isActive = (key: CheckoutStep) => currentStep === key;

  // Input base classes for theme
  const inputBaseClasses =
    'w-full px-4 py-3 border rounded-md font-inter text-[#1A1A1A] placeholder-[#666666] bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#4318D1] focus:border-[#4318D1]';
  const inputNormalBorder = ' border-[#E5E5E5]';
  const inputErrorBorder = ' border-red-300 ring-red-400 focus:ring-red-400';

  const handleChange = (field: keyof CheckoutFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const stepOrder: CheckoutStep[] = ['delivery', 'payment', 'review'];

  const goToStep = (step: CheckoutStep) => {
    setCurrentStep(step);
    setErrors({});
    if (typeof onStepChange === 'function') onStepChange(step);
  };

  // Validation logic (unchanged)
  const validateForStep = useMemo(() => {
    return (values: CheckoutFormData, step: CheckoutStep): CheckoutFormErrors => {
      const next: CheckoutFormErrors = {};
      if (step === 'delivery') {
        const required: Array<keyof CheckoutFormData> = [
          'firstName',
          'lastName',
          'email',
          'phone',
          'streetAddress',
          'city',
          'zipCode'
        ];
        required.forEach((key) => {
          if (!values[key] || String(values[key]).trim() === '') {
            next[key] = 'Required';
          }
        });
        // Simple email/phone sanity checks
        if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
          next.email = 'Invalid email';
        }
        if (values.phone && !/^\+?[0-9\s-]{6,}$/.test(values.phone)) {
          next.phone = 'Invalid phone';
        }
      }
      return next;
    };
  }, [onStepChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForStep(form, currentStep);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (currentStep === 'delivery') {
      goToStep('payment');
      return;
    }
    if (currentStep === 'payment') {
      goToStep('review');
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-inter">
      {/* Header Bar */}
      <header className="w-full bg-white shadow-sm py-3 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#4318D1] flex items-center justify-center mr-2">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="2" fill="#fff"/><rect x="4" y="7" width="16" height="10" rx="2" stroke="#4318D1" strokeWidth="2"/></svg>
          </div>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#1A1A1A] font-medium text-sm hover:underline">Sign In</a>
          <button className="bg-[#4318D1] hover:bg-[#10B981] text-white font-semibold px-4 py-1.5 rounded-lg text-sm transition-all">Help</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Title & Subtext */}
        <div className="mb-12">
          <h2 className="text-[24px] leading-[36px] font-bold text-[#1A1A1A] mb-1">Checkout</h2>
          <p className="text-base text-[#666666]">Complete your order and get your food delivered</p>
        </div>

        {/* Progress Stepper */}
        <nav aria-label="Progress" className="max-w-3xl mx-auto mb-12">
          <ol className="flex items-center justify-center gap-8">
            {steps.map((s, idx) => (
              <li key={s.key} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold mb-2
                      ${isActive(s.key)
                        ? 'bg-[#4318D1] text-white'
                        : 'bg-white text-[#1A1A1A] border-2 border-[#E5E5E5]'}
                    `}
                    aria-current={isActive(s.key) ? 'step' : undefined}
                  >
                    {s.number}
                  </div>
                  <span className={`text-sm font-medium ${isActive(s.key) ? 'text-[#4318D1]' : 'text-[#666666]'}`}>{s.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-24 h-0.5 mx-4 bg-[#E5E5E5]" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-[20px] leading-[30px] font-bold text-[#1A1A1A]">Delivery Information</h3>
          </div>

          {/* Divider */}
          <hr className="border-[#E5E5E5] -mt-4 mb-6" />

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                First Name <span className="text-[#10B981]">*</span>
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={handleChange('firstName')}
                placeholder="Enter first name"
                name="firstName"
                autoComplete="given-name"
                className={`${inputBaseClasses}${errors.firstName ? inputErrorBorder : inputNormalBorder}`}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Last Name <span className="text-[#10B981]">*</span>
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={handleChange('lastName')}
                placeholder="Enter last name"
                name="lastName"
                autoComplete="family-name"
                className={`${inputBaseClasses}${errors.lastName ? inputErrorBorder : inputNormalBorder}`}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Email Address <span className="text-[#10B981]">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="Enter email address"
                name="email"
                autoComplete="email"
                className={`${inputBaseClasses}${errors.email ? inputErrorBorder : inputNormalBorder}`}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Phone Number <span className="text-[#10B981]">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="Enter phone number"
                name="phone"
                autoComplete="tel"
                className={`${inputBaseClasses}${errors.phone ? inputErrorBorder : inputNormalBorder}`}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            {/* Street Address (full width) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Street Address <span className="text-[#10B981]">*</span>
              </label>
              <input
                type="text"
                value={form.streetAddress}
                onChange={handleChange('streetAddress')}
                placeholder="Enter street address"
                name="streetAddress"
                autoComplete="street-address"
                className={`${inputBaseClasses}${errors.streetAddress ? inputErrorBorder : inputNormalBorder}`}
                aria-invalid={!!errors.streetAddress}
              />
              {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
            </div>
            {/* Apartment/Unit */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Apartment/Unit</label>
              <input
                type="text"
                value={form.apartment}
                onChange={handleChange('apartment')}
                placeholder="Apt, suite, etc."
                name="apartment"
                className={`${inputBaseClasses}${inputNormalBorder}`}
              />
            </div>
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                City <span className="text-[#10B981]">*</span>
              </label>
              <input
                type="text"
                value={form.city}
                onChange={handleChange('city')}
                placeholder="Enter city"
                name="city"
                autoComplete="address-level2"
                className={`${inputBaseClasses}${errors.city ? inputErrorBorder : inputNormalBorder}`}
                aria-invalid={!!errors.city}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                ZIP Code <span className="text-[#10B981]">*</span>
              </label>
              <input
                type="text"
                value={form.zipCode}
                onChange={handleChange('zipCode')}
                placeholder="Enter ZIP"
                name="zipCode"
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`${inputBaseClasses}${errors.zipCode ? inputErrorBorder : inputNormalBorder}`}
                aria-invalid={!!errors.zipCode}
              />
              {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
            </div>
            {/* Delivery Instructions (full width) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Delivery Instructions</label>
              <textarea
                value={form.deliveryInstructions}
                onChange={handleChange('deliveryInstructions')}
                placeholder=""
                name="deliveryInstructions"
                className={`w-full min-h-[120px] px-4 py-3 border rounded-md font-inter text-[#1A1A1A] placeholder-[#666666] bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#4318D1] focus:border-[#4318D1] border-[#E5E5E5]`}
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 px-8 rounded-xl bg-[#4318D1] hover:bg-[#10B981] text-white font-semibold text-lg shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
          >
            Continue to Payment
          </button>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
