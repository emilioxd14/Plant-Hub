import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Sun, Thermometer } from 'lucide-react';

const getMetricStatus = (val, min, max) => {
  if (val < min * 0.8 || val > max * 1.2) return 'critical';
  if (val < min || val > max) return 'warning';
  return 'optimal';
};

const getStatusColor = (status) => {
  switch (status) {
    case 'critical': return 'text-coral-red';
    case 'warning': return 'text-soft-gold';
    default: return 'text-emerald';
  }
};

const Metric = ({ icon: Icon, value, status, label }) => (
  <div className="flex flex-col items-center">
    <Icon className={`w-5 h-5 mb-1 ${getStatusColor(status)}`} />
    <span className="font-space font-medium text-white/90 text-sm">{value}</span>
    <span className="text-white/50 text-xs font-outfit">{label}</span>
  </div>
);

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();
  const { currentTelemetry: t, optimalThresholds: o } = plant;

  const mStatus = getMetricStatus(t.moisture, o.moisture.min, o.moisture.max);
  const lStatus = getMetricStatus(t.light, o.light.min, o.light.max);
  const tStatus = getMetricStatus(t.temperature, o.temperature.min, o.temperature.max);

  // Overall card border color based on worst status
  const cardBorder = mStatus === 'critical' || lStatus === 'critical' || tStatus === 'critical'
    ? 'border-coral-red/30 hover:border-coral-red/60'
    : mStatus === 'warning' || lStatus === 'warning' || tStatus === 'warning'
      ? 'border-soft-gold/30 hover:border-soft-gold/60'
      : 'border-emerald/15 hover:border-emerald/40';

  return (
    <div 
      onClick={() => navigate(`/plant/${plant.id}`)}
      className={`relative overflow-hidden bg-plant-card rounded-2xl p-6 border ${cardBorder} backdrop-blur-xl cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald/5`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-outfit text-xl font-semibold text-white mb-1">{plant.name}</h3>
          <p className="font-space text-sm text-cyber-mint/70">{plant.species}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${getStatusColor(mStatus === 'critical' ? 'critical' : mStatus === 'warning' ? 'warning' : 'optimal').replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`} />
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
        <Metric icon={Droplets} value={`${t.moisture}%`} status={mStatus} label="Moisture" />
        <Metric icon={Sun} value={`${t.light}lx`} status={lStatus} label="Light" />
        <Metric icon={Thermometer} value={`${t.temperature}°C`} status={tStatus} label="Temp" />
      </div>
    </div>
  );
};

export default PlantCard;
