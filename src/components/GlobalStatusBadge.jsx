import React from 'react';
import { usePlants } from '../context/PlantContext';
import { Activity, AlertTriangle, CheckCircle, CreditCard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlobalStatusBadge = () => {
  const { getGlobalStatus, logout, isProMember } = usePlants();
  const status = getGlobalStatus();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center gap-4">
      {/* System Status Indicator */}
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.border} backdrop-blur-md transition-all duration-300`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className={`font-outfit text-sm font-medium ${config.color}`}>{config.text}</span>
      </div>

      {/* Auth & Billing Navigation */}
      <div className="flex items-center gap-2">
        {!isProMember && (
          <button 
            onClick={() => navigate('/billing')}
            className="p-2 bg-soft-gold/10 border border-soft-gold/30 hover:bg-soft-gold/20 rounded-full transition-colors text-soft-gold hover:shadow-[0_0_10px_rgba(251,191,36,0.3)]"
            aria-label="Upgrade to Pro"
            title="Upgrade to Pro"
          >
            <CreditCard className="w-4 h-4" />
          </button>
        )}
        <button 
          onClick={handleLogout}
          className="p-2 bg-dark-bg/50 border border-white/10 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
          aria-label="Log Out"
          title="Log Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default GlobalStatusBadge;
