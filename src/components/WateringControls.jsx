import React, { useState } from 'react';
import { Droplets, Settings, Plane } from 'lucide-react';

const WateringControls = ({ plant }) => {
  const [activeMode, setActiveMode] = useState('ai'); // ai, manual, vacation

  return (
    <div className="bg-plant-card border border-emerald/15 rounded-2xl p-6 backdrop-blur-xl">
      <h3 className="font-outfit text-white mb-4">Actuator Controls</h3>
      
      <div className="flex flex-col gap-3">
        <button 
          onClick={() => setActiveMode('ai')}
          className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
            activeMode === 'ai' 
              ? 'bg-emerald/10 border-emerald/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
              : 'bg-dark-bg/30 border-white/5 hover:border-emerald/30'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeMode === 'ai' ? 'bg-emerald/20 text-emerald' : 'bg-white/5 text-white/50'}`}>
            <Settings className="w-5 h-5" />
          </div>
          <div className="text-left flex-grow">
            <h4 className={`font-outfit text-sm ${activeMode === 'ai' ? 'text-emerald' : 'text-white'}`}>AI Automated Target</h4>
            <p className="font-space text-xs text-white/50">Maintains {plant.optimalThresholds.moisture.min}-{plant.optimalThresholds.moisture.max}% moisture</p>
          </div>
          {activeMode === 'ai' && <div className="w-2 h-2 rounded-full bg-emerald shadow-[0_0_8px_#10b981]" />}
        </button>

        <button 
          onClick={() => setActiveMode('manual')}
          className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
            activeMode === 'manual' 
              ? 'bg-cyber-mint/10 border-cyber-mint/50 shadow-[0_0_15px_rgba(45,212,191,0.1)]' 
              : 'bg-dark-bg/30 border-white/5 hover:border-cyber-mint/30'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeMode === 'manual' ? 'bg-cyber-mint/20 text-cyber-mint' : 'bg-white/5 text-white/50'}`}>
            <Droplets className="w-5 h-5" />
          </div>
          <div className="text-left flex-grow">
            <h4 className={`font-outfit text-sm ${activeMode === 'manual' ? 'text-cyber-mint' : 'text-white'}`}>Manual Override</h4>
            <p className="font-space text-xs text-white/50">Disables AI logic for direct control</p>
          </div>
          {activeMode === 'manual' && (
            <button className="bg-cyber-mint text-dark-bg px-3 py-1 rounded text-xs font-outfit hover:bg-cyber-mint/80 transition-colors">
              Water Now
            </button>
          )}
        </button>

        <button 
          onClick={() => setActiveMode('vacation')}
          className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
            activeMode === 'vacation' 
              ? 'bg-soft-gold/10 border-soft-gold/50 shadow-[0_0_15px_rgba(251,191,36,0.1)]' 
              : 'bg-dark-bg/30 border-white/5 hover:border-soft-gold/30'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeMode === 'vacation' ? 'bg-soft-gold/20 text-soft-gold' : 'bg-white/5 text-white/50'}`}>
            <Plane className="w-5 h-5" />
          </div>
          <div className="text-left flex-grow">
            <h4 className={`font-outfit text-sm ${activeMode === 'vacation' ? 'text-soft-gold' : 'text-white'}`}>Vacation Mode</h4>
            <p className="font-space text-xs text-white/50">Reroutes to external reservoir</p>
          </div>
          {activeMode === 'vacation' && <div className="w-2 h-2 rounded-full bg-soft-gold shadow-[0_0_8px_#fbbf24]" />}
        </button>
      </div>
    </div>
  );
};

export default WateringControls;
