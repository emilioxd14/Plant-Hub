import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePlants } from '../context/PlantContext';
import { CreditCard, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';

const BillingView = () => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  const [displayCardNumber, setDisplayCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { upgradeToPro } = usePlants();
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product || { name: 'Hardware Checkout', price: 0 };

  // Masking logic on blur
  const handleCardNumberBlur = () => {
    if (cardNumber.length >= 4) {
      const last4 = cardNumber.slice(-4);
      setDisplayCardNumber(`•••• •••• •••• ${last4}`);
    }
  };

  const handleCardNumberFocus = () => {
    setDisplayCardNumber(cardNumber);
  };

  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // only digits
    setCardNumber(val);
    setDisplayCardNumber(val);
  };

  const handleCheckout = (e) => {
    e.preventDefault(); // SECURITY REQUIREMENT
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // We can trigger an upgrade or simply complete the purchase
      if (product.name.includes('Pro')) {
        upgradeToPro();
      }

      // Redirect after success message
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate('/store')}
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-outfit font-bold tracking-tight text-white flex items-center gap-2">
            Secure <span className="text-emerald">Checkout</span>
          </h1>
        </div>
      </header>

      <main className="px-6 py-12 max-w-lg mx-auto relative">
        {/* Success Overlay */}
        {isSuccess && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg/90 backdrop-blur-md rounded-3xl animate-fade-in border border-emerald/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <ShieldCheck className="w-16 h-16 text-emerald mb-4 animate-bounce" />
            <h2 className="text-2xl font-outfit font-bold text-white mb-2">Order Confirmed</h2>
            <p className="font-space text-emerald">Your {product.name} is being prepared.</p>
          </div>
        )}

        <div className="bg-plant-card border border-emerald/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
           {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

          <div className="mb-8">
            <h2 className="text-2xl font-outfit font-bold text-white mb-2">Order Details</h2>
            <p className="font-space text-sm text-white/50">Purchasing: <span className="text-white font-medium">{product.name}</span></p>
          </div>

          <form onSubmit={handleCheckout} className="space-y-5">
            <div>
              <label className="block font-space text-xs text-white/70 mb-1" htmlFor="cardName">Cardholder Name</label>
              <input
                id="cardName"
                type="text"
                autoComplete="cc-name"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 transition-all"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="block font-space text-xs text-white/70 mb-1" htmlFor="cardNumber">Card Number</label>
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
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 pl-10 text-white font-space focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 transition-all"
                  placeholder="•••• •••• •••• ••••"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-space text-xs text-white/70 mb-1" htmlFor="expiry">Expiry Date</label>
                <input
                  id="expiry"
                  type="text"
                  autoComplete="cc-exp"
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 transition-all"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block font-space text-xs text-white/70 mb-1" htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  type="password"
                  autoComplete="cc-csc"
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 transition-all"
                  placeholder="•••"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2 text-xs text-white/40 font-space mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald" />
              <span>Payments are securely processed. We do not store your full card details.</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing || isSuccess}
              className="w-full py-3 bg-emerald hover:bg-cyber-mint text-dark-bg font-outfit font-semibold rounded-xl transition-colors duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] flex justify-center items-center h-12 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : `Process Payment - $${product.price}`}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BillingView;
