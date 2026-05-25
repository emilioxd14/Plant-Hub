import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '../context/PlantContext';
import { ShoppingBag, LogOut } from 'lucide-react';

const GlobalStatusBadge = () => {
  const { logout } = usePlants();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate('/store')}
        className="p-2 bg-emerald/10 border border-emerald/30 hover:bg-emerald/20 rounded-full transition-all duration-200 text-emerald hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
        aria-label="Open Store"
        title="PlantHub Store"
      >
        <ShoppingBag className="w-4 h-4" />
      </button>
      <button
        onClick={handleLogout}
        className="p-2 bg-dark-bg/50 border border-white/10 hover:bg-white/10 rounded-full transition-all duration-200 text-white/70 hover:text-white"
        aria-label="Log Out"
        title="Log Out"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
};

export default GlobalStatusBadge;
