import React from 'react';
import { usePlants } from '../context/PlantContext';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const GlobalStatusBadge = () => {
  const { getGlobalStatus } = usePlants();
  const status = getGlobalStatus();

  const getStatusConfig = () => {
    switch (status) {
      case 'critical':
        return { icon: AlertTriangle, color: 'text-coral-red', bg: 'bg-coral-red/10', border: 'border-coral-red/30', text: 'Critical Attention Needed' };
      case 'warning':
        return { icon: Activity, color: 'text-soft-gold', bg: 'bg-soft-gold/10', border: 'border-soft-gold/30', text: 'Minor Warnings Detected' };
      case 'optimal':
      default:
        return { icon: CheckCircle, color: 'text-emerald', bg: 'bg-emerald/10', border: 'border-emerald/30', text: 'All Systems Optimal' };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center space-x-3 px-4 py-2 rounded-full border ${config.bg} ${config.border} backdrop-blur-md transition-all duration-300`}>
      <Icon className={`w-5 h-5 ${config.color}`} />
      <span className={`font-outfit font-medium ${config.color}`}>{config.text}</span>
    </div>
  );
};

export default GlobalStatusBadge;
