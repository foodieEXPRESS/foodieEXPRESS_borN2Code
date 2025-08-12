import React, { useMemo, useState } from 'react';
// Import types for form data, step, and errors
import type { CheckoutFormData, CheckoutStep, CheckoutFormErrors } from './dataTypes';
import type { CheckoutProps } from './propsTypes';
impo
// Brand logo component using the Italiana font
const BrandLogo = () => (
  <span className="font-italiana text-[1.7rem] tracking-tight text-[#1A1A1A]">FoodieExpress</span>
);

// Define the steps for the checkout process
const steps: Array<{ key: CheckoutStep; label: string; number: number }> = [
  { key: 'delivery', label: 'Delivery Info', number: 1 },
  { key: 'payment', label: 'Payment', number: 2 },
  { key: 'review', label: 'Review', number: 3 }
];

// Default values for the checkout form
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

// Main Checkout component
const Checkout: React.FC<CheckoutProps> = ({
  initialStep = 'delivery', // Which step to start on
  initialValues = {},       // Any initial form values
  onSubmit = () => {},      // Callback when the form is submitted
  onStepChange              // Callback when the step changes
}) => {
  // State for the current step in the checkout process
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(initialStep);
  // State for the form data
  const [form, setForm] = useState<CheckoutFormData>({ ...defaultValues, ...initialValues });
  // State for form validation errors
  const [errors, setErrors] = useState<CheckoutFormErrors>({});

  // Helper to check if a step is currently active
  const isActive = (key: CheckoutStep) => currentStep === key;

  // Tailwind CSS classes for input fields
  const inputBaseClasses =
    'w-full px-4 py-3 border rounded-md font-inter text-[#1A1A1A] placeholder-[#666666] bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#4318D1] focus:border-[#4318D1]';
  const inputNormalBorder = ' border-[#E5E5E5]';
  const inputErrorBorder = ' border-red-300 ring-red-400 focus:ring-red-400';

  // Handler for input changes (updates form state and clears errors for that field)
  const handleChange = (field: keyof CheckoutFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Helper to move to a different step
  const goToStep = (step: CheckoutStep) => {
    setCurrentStep(step);
    setErrors({});
    if (typeof onStepChange === 'function') onStepChange(step);
  };

  // Validation logic for each step (memoized for performance)
  const validateForStep = useMemo(() => {
    return (values: CheckoutFormData, step: CheckoutStep): CheckoutFormErrors => {
      const next: CheckoutFormErrors = {};
      if (step === 'delivery') {
        // Required fields for delivery step
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
        // Simple email and phone validation
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

  // Handle form submission for each step
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form for the current step
    const nextErrors = validateForStep(form, currentStep);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return; // If errors, do not proceed
    if (currentStep === 'delivery') {
      goToStep('payment'); // Go to payment step
      return;
    }
    if (currentStep === 'payment') {
      goToStep('review'); // Go to review step
      return;
    }
    onSubmit(form); // Final submit
  };

  // Render the component
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-inter">


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Title & Subtext */}
        <div className="mb-10 mt-2">
          <h2 className="text-[24px] leading-[36px] font-bold text-[#1A1A1A] mb-1">Checkout</h2>
          <p className="text-base text-[#666666]">Complete your order and get your food delivered</p>
        </div>

        {/* Progress Stepper */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-8">
            {steps.map((s, idx) => (
              <div key={s.key} className="flex items-center">
                <div className="flex flex-col items-center">
                  {/* Step number circle */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-base font-semibold mb-1
                      ${isActive(s.key)
                        ? 'bg-[#4318D1] text-white'
                        : 'bg-white text-[#666666] border-2 border-[#E5E5E5]'}
                    `}
                  >
                    {s.number}
                  </div>
                  {/* Step label */}
                  <span className={`text-xs font-medium ${isActive(s.key) ? 'text-[#4318D1]' : 'text-[#666666]'}`}>{s.label}</span>
                </div>
                {/* Divider between steps */}
                {idx < steps.length - 1 && (
                  <div className="w-16 h-0.5 mx-3 bg-[#E5E5E5]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            {/* Location icon */}
            <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-[20px] leading-[32px] font-bold text-[#1A1A1A]">Delivery Information</h2>
          </div>

          {/* Divider */}
          <hr className="border-[#E5E5E5] -mt-4 mb-6" />

          {/* Form Fields - grid layout for responsive design */}
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
            {/* Street Address */}
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
            {/* Delivery Instructions */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Delivery Instructions</label>
              <textarea
                value={form.deliveryInstructions}
                onChange={handleChange('deliveryInstructions')}
                placeholder=""
                name="deliveryInstructions"
                className={`w-full min-h-[100px] px-4 py-3 border rounded-md font-inter text-[#1A1A1A] placeholder-[#666666] bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#4318D1] focus:border-[#4318D1] border-[#E5E5E5]`}
              />
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#4318D1] hover:bg-[#10B981] text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
