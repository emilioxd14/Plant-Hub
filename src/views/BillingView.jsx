import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';

const BillingView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Accept product passed from StoreView, or fall back to Pro subscription
  const product = location.state?.product ?? {
    name: 'PlantHub Pro Subscription',
    price: 9.99,
    tagline: 'AI Care Insights — Monthly',
  };

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [displayCardNumber, setDisplayCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Card Number Masking ---
  const handleCardNumberChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(digits);
    setDisplayCardNumber(digits);
  };

  const handleCardNumberFocus = () => {
    setDisplayCardNumber(cardNumber);
  };

  const handleCardNumberBlur = () => {
    if (cardNumber.length >= 4) {
      const last4 = cardNumber.slice(-4);
      setDisplayCardNumber(`•••• •••• •••• ${last4}`);
    }
  };

  // --- Expiry Formatting ---
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
    setExpiry(val);
  };

  // --- SECURITY: e.preventDefault() prevents URL data leakage ---
  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      navigate('/shipping', { state: { product } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-outfit font-bold tracking-tight text-white">
            Secure <span className="text-soft-gold">Checkout</span>
          </h1>
          <p className="font-space text-xs text-white/50">Step 1 of 2 — Payment</p>
        </div>
      </header>

      <main className="px-6 py-12 max-w-lg mx-auto">
        {/* Order Summary */}
        <div className="bg-emerald/5 border border-emerald/20 rounded-2xl p-4 mb-6 flex justify-between items-center">
          <div>
            <p className="font-outfit text-white font-medium">{product.name}</p>
            {product.tagline && (
              <p className="font-space text-xs text-white/50 mt-0.5">{product.tagline}</p>
            )}
          </div>
          <span className="text-2xl font-outfit font-bold text-white">${product.price.toFixed(2)}</span>
        </div>

        {/* Checkout Form */}
        <div className="bg-plant-card border border-soft-gold/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-soft-gold/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

          <form onSubmit={handleCheckout} className="space-y-5" noValidate>
            {/* Cardholder Name */}
            <div>
              <label className="block font-space text-xs text-white/70 mb-1" htmlFor="cardName">
                Cardholder Name
              </label>
              <input
                id="cardName"
                type="text"
                autoComplete="cc-name"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-soft-gold/50 focus:ring-1 focus:ring-soft-gold/50 transition-all"
                placeholder="Jane Doe"
              />
            </div>

            {/* Card Number with masking */}
            <div>
              <label className="block font-space text-xs text-white/70 mb-1" htmlFor="cardNumber">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                <input
                  id="cardNumber"
                  type="text"
                  autoComplete="cc-number"
                  inputMode="numeric"
                  required
                  value={displayCardNumber}
                  onChange={handleCardNumberChange}
                  onFocus={handleCardNumberFocus}
                  onBlur={handleCardNumberBlur}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 pl-10 text-white font-space focus:outline-none focus:border-soft-gold/50 focus:ring-1 focus:ring-soft-gold/50 transition-all tracking-widest"
                  placeholder="•••• •••• •••• ••••"
                />
              </div>
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-space text-xs text-white/70 mb-1" htmlFor="expiry">
                  Expiry Date
                </label>
                <input
                  id="expiry"
                  type="text"
                  autoComplete="cc-exp"
                  inputMode="numeric"
                  required
                  value={expiry}
                  onChange={handleExpiryChange}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-soft-gold/50 focus:ring-1 focus:ring-soft-gold/50 transition-all"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block font-space text-xs text-white/70 mb-1" htmlFor="cvv">
                  CVV
                </label>
                {/* SECURITY: type="password" hides the CVV value */}
                <input
                  id="cvv"
                  type="password"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-soft-gold/50 focus:ring-1 focus:ring-soft-gold/50 transition-all"
                  placeholder="•••"
                />
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-2 text-xs text-white/40 font-space pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
              <span>
                Your payment is processed securely. Card details are never stored in plain text or
                transmitted in URL parameters.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-12 py-3 bg-soft-gold hover:bg-yellow-400 text-dark-bg font-outfit font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying Payment…</span>
                </>
              ) : (
                `Continue — $${product.price.toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BillingView;
