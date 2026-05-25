import React, { useState } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { queryRAGDatabase } from '../data/mockPlants';
import { usePlants } from '../context/PlantContext';

const AddPlantModal = ({ isOpen, onClose }) => {
  const [species, setSpecies] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { addPlant } = usePlants();

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!species.trim()) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await queryRAGDatabase(species);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    if (!result) return;
    const newPlant = {
      id: `plant-${Date.now()}`,
      species: result.species,
      name: `My ${result.species}`,
      optimalThresholds: result.optimalThresholds,
      currentTelemetry: {
        moisture: (result.optimalThresholds.moisture.max + result.optimalThresholds.moisture.min) / 2,
        light: (result.optimalThresholds.light.max + result.optimalThresholds.light.min) / 2,
        temperature: (result.optimalThresholds.temperature.max + result.optimalThresholds.temperature.min) / 2,
      },
      history: Array.from({ length: 24 }).map((_, i) => ({
        time: `${i}:00`,
        moisture: result.optimalThresholds.moisture.min + Math.random() * 20,
        light: result.optimalThresholds.light.min + Math.random() * 1000,
        temperature: result.optimalThresholds.temperature.min + Math.random() * 5,
      })),
    };
    addPlant(newPlant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm p-4">
      <div className="bg-plant-card border border-emerald/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-outfit text-white mb-2">Add New Plant</h2>
          <p className="text-white/60 font-space text-sm mb-6">Enter a species to query our Botanical RAG Database.</p>
          
          <form onSubmit={handleSearch} className="relative mb-6">
            <input
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              placeholder="e.g. Monstera Deliciosa"
              className="w-full bg-dark-bg/50 border border-white/10 rounded-lg py-3 px-4 pl-10 text-white font-space focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 transition-all"
            />
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-4" />
            <button 
              type="submit" 
              disabled={loading || !species.trim()}
              className="absolute right-2 top-2 bg-emerald/20 hover:bg-emerald/30 text-emerald p-1.5 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </form>

          {result && (
            <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-4 mb-6 animate-fade-in">
              <h3 className="font-outfit text-emerald mb-2">Match Found: {result.species}</h3>
              <p className="font-space text-sm text-white/70 mb-4">{result.insight}</p>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-dark-bg/50 p-2 rounded text-center">
                  <span className="block text-xs text-white/50 font-space mb-1">Moisture</span>
                  <span className="text-sm text-white">{result.optimalThresholds.moisture.min}-{result.optimalThresholds.moisture.max}%</span>
                </div>
                <div className="bg-dark-bg/50 p-2 rounded text-center">
                  <span className="block text-xs text-white/50 font-space mb-1">Light</span>
                  <span className="text-sm text-white">{result.optimalThresholds.light.min}lx+</span>
                </div>
                <div className="bg-dark-bg/50 p-2 rounded text-center">
                  <span className="block text-xs text-white/50 font-space mb-1">Temp</span>
                  <span className="text-sm text-white">{result.optimalThresholds.temperature.min}-{result.optimalThresholds.temperature.max}°C</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-lg font-outfit text-white/70 hover:text-white transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleAdd}
              disabled={!result}
              className="px-6 py-2 rounded-lg font-outfit bg-emerald text-dark-bg hover:bg-cyber-mint transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Initialize Plant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlantModal;
