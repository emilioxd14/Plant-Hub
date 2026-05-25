import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Cpu, ShieldCheck } from 'lucide-react';

const products = [
  {
    id: 'nano',
    name: 'PlantHub Nano',
    description: 'Compact sensor suite for desktop and small indoor plants. Measures moisture, light, and ambient temperature.',
    price: 49.99,
    size: 'Small',
    icon: Cpu
  },
  {
    id: 'classic',
    name: 'PlantHub Classic',
    description: 'The standard telemetry hub. Includes built-in AI care insights, advanced soil pH monitoring, and a 200ml reservoir connection.',
    price: 129.99,
    size: 'Medium',
    icon: ShieldCheck
  },
  {
    id: 'tower',
    name: 'PlantHub Tower',
    description: 'Professional grade. Supports multi-plant networking, external high-capacity reservoirs, and HD visual health scanning.',
    price: 249.99,
    size: 'Large',
    icon: ShoppingBag
  }
];

const StoreView = () => {
  const navigate = useNavigate();

  const handleBuy = (product) => {
    navigate('/billing', { state: { product } });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-outfit font-bold tracking-tight text-white flex items-center gap-2">
            Hardware <span className="text-emerald">Store</span>
          </h1>
          <p className="font-space text-xs text-white/50">Official Telemetry Modules</p>
        </div>
      </header>

      <main className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div key={product.id} className="bg-plant-card border border-emerald/15 rounded-3xl p-8 backdrop-blur-xl flex flex-col transition-all duration-300 hover:border-emerald/40 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                
                <div className="w-16 h-16 bg-emerald/10 text-emerald rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-outfit font-bold text-white mb-2">{product.name}</h2>
                <div className="text-emerald font-space text-lg font-medium mb-4">${product.price}</div>
                
                <p className="font-space text-sm text-white/60 mb-6 flex-grow leading-relaxed">
                  {product.description}
                </p>
                
                <div className="text-xs font-space text-white/40 mb-6 py-2 border-t border-b border-white/5">
                  Form Factor: {product.size}
                </div>
                
                <button 
                  onClick={() => handleBuy(product)}
                  className="w-full py-3 bg-emerald hover:bg-cyber-mint text-dark-bg font-outfit font-semibold rounded-xl transition-colors duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                >
                  Buy Now
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default StoreView;
