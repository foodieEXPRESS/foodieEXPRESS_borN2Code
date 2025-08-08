import React, { useMemo, useState } from 'react';
import Header from '../../components/Header';
import type { CheckoutFormData, CheckoutStep, CheckoutFormErrors } from './dataTypes';
import type { CheckoutProps } from './propsTypes';

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
  deliveryInstructions: ''
};

const Checkout: React.FC<CheckoutProps> = ({
  initialStep = 'delivery',
  initialValues = {},
  onSubmit = () => {}
}) => {
  const [currentStep] = useState<CheckoutStep>(initialStep);
  const [form, setForm] = useState<CheckoutFormData>({ ...defaultValues, ...initialValues });
  const [errors, setErrors] = useState<CheckoutFormErrors>({});

  const isActive = (key: CheckoutStep) => currentStep === key;

  const inputBaseClasses =
    'w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-secondary-gray bg-white';
  const inputNormalBorder = ' border-secondary-light';
  const inputErrorBorder = ' border-red-300 ring-red-400 focus:ring-red-400';

  const handleChange = (field: keyof CheckoutFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = useMemo(() => {
    const required: Array<keyof CheckoutFormData> = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'streetAddress',
      'city',
      'zipCode'
    ];
    return (values: CheckoutFormData): CheckoutFormErrors => {
      const next: CheckoutFormErrors = {};
      required.forEach((key) => {
        if (!values[key] || String(values[key]).trim() === '') {
          next[key] = 'Required';
        }
      });
      return next;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-lighter">
      <Header />

      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-heading-1 font-sans text-secondary-dark">Checkout</h1>
          <p className="text-secondary-gray mt-1">
            Complete your order and get your food delivered
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {steps.map((s, idx) => (
            <div key={s.key} className="flex items-center gap-3">
              <div
                className={
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ' +
                  (isActive(s.key)
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-secondary-dark border border-secondary-light')
                }
              >
                {s.number}
              </div>
              <span className={`text-sm font-medium ${isActive(s.key) ? 'text-primary' : 'text-secondary-gray'}`}>
                {s.label}
              </span>
              {idx < steps.length - 1 && (
                <div className="w-8 h-px bg-secondary-light ml-3" />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-3xl mx-auto ring-1 ring-black/5">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-heading-2 text-secondary-dark">Delivery Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-2">
                First Name <span className="text-primary">*</span>
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
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-2">
                Last Name <span className="text-primary">*</span>
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
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-2">
                Email Address <span className="text-primary">*</span>
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
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-2">
                Phone Number <span className="text-primary">*</span>
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
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Street Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-dark mb-2">
                Street Address <span className="text-primary">*</span>
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
              {errors.streetAddress && (
                <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>
              )}
            </div>

            {/* Apartment */}
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-2">Apartment/Unit</label>
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
              <label className="block text-sm font-medium text-secondary-dark mb-2">
                City <span className="text-primary">*</span>
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
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            {/* ZIP */}
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-2">
                ZIP Code <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={form.zipCode}
                onChange={handleChange('zipCode')}
                placeholder="Enter ZIP"
                name="zip"
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`${inputBaseClasses}${errors.zipCode ? inputErrorBorder : inputNormalBorder}`}
                aria-invalid={!!errors.zipCode}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
              )}
            </div>

            {/* Delivery Instructions */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-dark mb-2">Delivery Instructions</label>
              <textarea
                value={form.deliveryInstructions}
                onChange={handleChange('deliveryInstructions')}
                placeholder=""
                name="instructions"
                className={`w-full min-h-[120px] px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-secondary-gray bg-white${inputNormalBorder}`}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
