import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, X, CheckCircle } from 'lucide-react';

const ShippingView = () => {
  const Maps = useNavigate();
  const location = useLocation();
  const product = location.state?.product ?? { name: 'PlantHub Product', price: 0 };

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // SECURITY: e.preventDefault() to prevent PII leakage via URL
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleCloseOverlay = () => {
    setShowSuccess(false);
    Maps('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => Maps(-1)}
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-outfit font-bold tracking-tight text-white">
            Shipping <span className="text-cyber-mint">Details</span>
          </h1>
          <p className="font-space text-xs text-white/50">Step 2 of 2 — Delivery Address</p>
        </div>
      </header>

      <main className="px-6 py-12 max-w-lg mx-auto">
        {/* Order Summary */}
        <div className="bg-emerald/5 border border-emerald/20 rounded-2xl p-4 mb-6 flex justify-between items-center">
          <div>
            <p className="font-outfit text-white font-medium">{product.name}</p>
            <p className="font-space text-xs text-white/50 mt-0.5">Delivering to your address</p>
          </div>
          <span className="text-2xl font-outfit font-bold text-white">${product.price.toFixed(2)}</span>
        </div>

        {/* Shipping Form */}
        <div className="bg-plant-card border border-cyber-mint/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-mint/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyber-mint/10 rounded-lg">
              <MapPin className="w-5 h-5 text-cyber-mint" />
            </div>
            <h2 className="font-outfit text-white font-semibold">Delivery Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full Name */}
            <div>
              <label className="block font-space text-xs text-white/70 mb-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-cyber-mint/50 focus:ring-1 focus:ring-cyber-mint/50 transition-all"
                placeholder="Jane Doe"
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="block font-space text-xs text-white/70 mb-1" htmlFor="address">
                Street Address
              </label>
              <input
                id="address"
                type="text"
                autoComplete="street-address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-cyber-mint/50 focus:ring-1 focus:ring-cyber-mint/50 transition-all"
                placeholder="123 Botanical Lane"
              />
            </div>

            {/* City + ZIP */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-space text-xs text-white/70 mb-1" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-cyber-mint/50 focus:ring-1 focus:ring-cyber-mint/50 transition-all"
                  placeholder="Greenville"
                />
              </div>
              <div>
                <label className="block font-space text-xs text-white/70 mb-1" htmlFor="zip">
                  ZIP Code
                </label>
                <input
                  id="zip"
                  type="text"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-cyber-mint/50 focus:ring-1 focus:ring-cyber-mint/50 transition-all"
                  placeholder="00000"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-space text-xs text-white/70 mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 text-white font-space focus:outline-none focus:border-cyber-mint/50 focus:ring-1 focus:ring-cyber-mint/50 transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 py-3 bg-cyber-mint hover:bg-teal-400 text-dark-bg font-outfit font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] flex justify-center items-center gap-2"
            >
              Confirm Purchase
            </button>
          </form>
        </div>
      </main>

      {/* Success Overlay Modal */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-dark-bg/80 backdrop-blur-md p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Purchase successful"
        >
          <div className="relative bg-plant-card border border-emerald/30 rounded-3xl p-10 max-w-sm w-full text-center shadow-[0_0_60px_rgba(16,185,129,0.2)] animate-fade-in">
            {/* Close button */}
            <button
              onClick={handleCloseOverlay}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              aria-label="Close and return to Hub"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-emerald/10 border border-emerald/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald" />
            </div>

            <h2 className="font-outfit text-2xl font-bold text-white mb-3">
              Purchase Successful!
            </h2>
            <p className="font-space text-white/70 text-sm leading-relaxed">
              Your <span className="text-emerald font-semibold">{product.name}</span> is on the way.
              You will receive a shipping confirmation shortly.
            </p>

            <button
              onClick={handleCloseOverlay}
              className="mt-8 w-full py-3 bg-emerald hover:bg-cyber-mint text-dark-bg font-outfit font-semibold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Return to PlantHub
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingView;
