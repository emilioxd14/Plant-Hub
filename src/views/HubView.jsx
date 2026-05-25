import React, { useState } from 'react';
import { usePlants } from '../context/PlantContext';
import PlantCard from '../components/PlantCard';
import AddPlantFab from '../components/AddPlantFab';
import AddPlantModal from '../components/AddPlantModal';
import AlertBanner from '../components/AlertBanner';

const HubView = () => {
  const { plants } = usePlants();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAlerts = () => {
    const activeAlerts = [];
    plants.forEach(plant => {
      const { currentTelemetry: t, optimalThresholds: o } = plant;
      
      // moisture
      if (t.moisture < o.moisture.min) {
        activeAlerts.push(`${plant.name}: Moisture is critically low (${t.moisture}% < optimal ${o.moisture.min}%)`);
      } else if (t.moisture > o.moisture.max) {
        activeAlerts.push(`${plant.name}: Moisture is warning high (${t.moisture}% > optimal ${o.moisture.max}%)`);
      }
      
      // light
      if (t.light < o.light.min) {
        activeAlerts.push(`${plant.name}: Light level is critically low (${t.light}lx < optimal ${o.light.min}lx)`);
      } else if (t.light > o.light.max) {
        activeAlerts.push(`${plant.name}: Light level is warning high (${t.light}lx > optimal ${o.light.max}lx)`);
      }
      
      // temperature
      if (t.temperature < o.temperature.min) {
        activeAlerts.push(`${plant.name}: Temperature is critically low (${t.temperature}°C < optimal ${o.temperature.min}°C)`);
      } else if (t.temperature > o.temperature.max) {
        activeAlerts.push(`${plant.name}: Temperature is warning high (${t.temperature}°C > optimal ${o.temperature.max}°C)`);
      }
    });
    return activeAlerts;
  };

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
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <AlertBanner alerts={getAlerts()} />
        
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
