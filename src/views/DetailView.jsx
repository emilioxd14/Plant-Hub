import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePlants } from '../context/PlantContext';
import TelemetryChart from '../components/TelemetryChart';
import VisualScanner from '../components/VisualScanner';
import WateringControls from '../components/WateringControls';
import CareInsights from '../components/CareInsights';

const DetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { plants } = usePlants();
  
  const plant = plants.find(p => p.id === id);

  if (!plant) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center">
        <h2 className="font-outfit text-2xl mb-4">Plant Not Found</h2>
        <button onClick={() => navigate('/')} className="text-emerald hover:underline font-space">
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-outfit font-bold tracking-tight text-white">
            {plant.name}
          </h1>
          <p className="font-space text-xs text-cyber-mint/70">{plant.species}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Data & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <TelemetryChart data={plant.history} />
          <VisualScanner plant={plant} />
        </div>

        {/* Right Column - Controls & AI */}
        <div className="space-y-6">
          <WateringControls plant={plant} />
          <CareInsights plant={plant} />
        </div>
      </main>
    </div>
  );
};

export default DetailView;
