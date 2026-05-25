import React, { useState } from 'react';
import { usePlants } from '../context/PlantContext';
import GlobalStatusBadge from '../components/GlobalStatusBadge';
import PlantCard from '../components/PlantCard';
import AddPlantFab from '../components/AddPlantFab';
import AddPlantModal from '../components/AddPlantModal';

const HubView = () => {
  const { plants } = usePlants();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-outfit font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-emerald">Plant</span>Hub
          </h1>
          <p className="font-space text-xs text-white/50">Unified Botanical Telemetry</p>
        </div>
        <GlobalStatusBadge />
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {plants.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/40">
            <p className="font-outfit text-lg">No plants initialized.</p>
            <p className="font-space text-sm">Click the + button to query the RAG database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <AddPlantFab onClick={() => setIsModalOpen(true)} />
      
      {/* Modal */}
      <AddPlantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HubView;
