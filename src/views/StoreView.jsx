import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Zap, Cpu, Layers } from 'lucide-react';

const PRODUCTS = [
  {
    id: 'nano',
    name: 'PlantHub Nano',
    tagline: 'Compact Intelligence',
    price: 49.99,
    icon: Zap,
    color: 'emerald',
    colorHex: '#10b981',
    features: [
      'Dual moisture & temperature sensors',
      'Bluetooth Low Energy telemetry',
      'Companion app integration',
      'Up to 3 plant profiles',
      '6-month battery life',
    ],
    description:
      'Perfect for enthusiasts. The Nano brings precision IoT sensing to a single plant in a whisper-quiet, pocket-sized form factor.',
  },
  {
    id: 'classic',
    name: 'PlantHub Classic',
    tagline: 'Professional Grade',
    price: 129.99,
    icon: Cpu,
    color: 'cyber-mint',
    colorHex: '#2dd4bf',
    badge: 'Most Popular',
    features: [
      'Advanced hydroponic sensors (NPK)',
      'AI-driven light spectrum optimization',
      'Wi-Fi & cloud sync',
      'Up to 12 plant profiles',
      'Automated watering actuator support',
    ],
    description:
      'The go-to choice for serious growers. The Classic harnesses AI to continuously calibrate ideal growing conditions, plant by plant.',
  },
  {
    id: 'tower',
    name: 'PlantHub Tower',
    tagline: 'Vertical Farm Grade',
    price: 299.99,
    icon: Layers,
    color: 'soft-gold',
    colorHex: '#fbbf24',
    features: [
      'Full-spectrum spectral analysis array',
      'RAG-powered botanical AI engine',
      'Ethernet & 5G failover connectivity',
      'Unlimited plant profiles',
      'External reservoir & vacation mode',
    ],
    description:
      'Enterprise-class precision for vertical farms and research labs. The Tower delivers unrivalled multi-zone environmental intelligence.',
  },
];

const colorMap = {
  emerald: {
    border: 'border-emerald/20 hover:border-emerald/50',
    badge_bg: 'bg-emerald/10',
    badge_text: 'text-emerald',
    icon_bg: 'bg-emerald/10',
    icon_text: 'text-emerald',
    btn: 'bg-emerald hover:bg-emerald/80 shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    glow: 'rgba(16,185,129,0.1)',
  },
  'cyber-mint': {
    border: 'border-cyber-mint/20 hover:border-cyber-mint/50',
    badge_bg: 'bg-cyber-mint/10',
    badge_text: 'text-cyber-mint',
    icon_bg: 'bg-cyber-mint/10',
    icon_text: 'text-cyber-mint',
    btn: 'bg-cyber-mint hover:bg-cyber-mint/80 shadow-[0_0_20px_rgba(45,212,191,0.3)]',
    glow: 'rgba(45,212,191,0.1)',
  },
  'soft-gold': {
    border: 'border-soft-gold/20 hover:border-soft-gold/50',
    badge_bg: 'bg-soft-gold/10',
    badge_text: 'text-soft-gold',
    icon_bg: 'bg-soft-gold/10',
    icon_text: 'text-soft-gold',
    btn: 'bg-soft-gold hover:bg-yellow-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]',
    glow: 'rgba(251,191,36,0.1)',
  },
};

const StoreView = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-bg text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-outfit font-bold tracking-tight text-white">
            <span className="text-emerald">Plant</span>Hub Store
          </h1>
          <p className="font-space text-xs text-white/50">Bio-Tech Hardware Collection</p>
        </div>
      </header>

      <main className="px-6 py-12 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-outfit font-bold text-white mb-4 leading-tight">
            Precision Hardware for<br />
            <span className="text-emerald">Intelligent Cultivation</span>
          </h2>
          <p className="font-space text-white/50 max-w-xl mx-auto text-sm">
            Every PlantHub device is engineered to integrate seamlessly with our AI telemetry platform —
            giving your plants a voice and your data a purpose.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => {
            const colors = colorMap[product.color];
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className={`relative flex flex-col bg-plant-card border ${colors.border} rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1`}
                style={{ boxShadow: `0 0 40px ${colors.glow}` }}
              >
                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-4 right-4 text-xs font-outfit font-semibold px-2 py-0.5 rounded-full ${colors.badge_bg} ${colors.badge_text} border border-current/30`}>
                    {product.badge}
                  </span>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${colors.icon_bg}`}>
                  <Icon className={`w-6 h-6 ${colors.icon_text}`} />
                </div>

                {/* Name & Tagline */}
                <h3 className="font-outfit text-xl font-bold text-white mb-1">{product.name}</h3>
                <p className={`font-space text-xs mb-3 ${colors.badge_text}`}>{product.tagline}</p>
                <p className="font-space text-white/60 text-sm leading-relaxed mb-5">{product.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-space text-xs text-white/70">
                      <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.icon_text} bg-current`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 relative z-40">
                  <div>
                    <span className="text-2xl font-outfit font-bold text-white">${product.price.toFixed(2)}</span>
                    <span className="text-white/40 font-space text-xs ml-1">one-time</span>
                  </div>
                  <Link
                    to="/billing"
                    state={{ product: product }}
                    className={`flex items-center justify-center relative z-50 cursor-pointer px-5 py-2 rounded-xl font-outfit font-semibold text-dark-bg transition-all duration-200 ${colors.btn}`}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default StoreView;
