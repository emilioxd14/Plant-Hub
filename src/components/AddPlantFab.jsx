import React from 'react';
import { Plus } from 'lucide-react';

const AddPlantFab = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-emerald hover:bg-cyber-mint rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-110 z-50"
      aria-label="Add Plant"
    >
      <Plus className="w-6 h-6 text-dark-bg" />
    </button>
  );
};

export default AddPlantFab;
