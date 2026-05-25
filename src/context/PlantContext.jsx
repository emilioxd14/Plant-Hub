import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockPlants } from '../data/mockPlants';

const PlantContext = createContext();

export const usePlants = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProMember, setIsProMember] = useState(false);
  
  // Initialize with mock plants
  useEffect(() => {
    setPlants(mockPlants);
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setIsProMember(false);
  };
  const upgradeToPro = () => setIsProMember(true);

  const addPlant = (newPlant) => {
    setPlants((prev) => [...prev, newPlant]);
  };

  const getGlobalStatus = () => {
    if (plants.length === 0) return 'neutral';
    let hasCritical = false;
    let hasWarning = false;

    plants.forEach(plant => {
      const { currentTelemetry, optimalThresholds } = plant;
      ['moisture', 'light', 'temperature'].forEach(metric => {
        const val = currentTelemetry[metric];
        const min = optimalThresholds[metric].min;
        const max = optimalThresholds[metric].max;
        
        // Simple logic for warning/critical (simulate threshold breaches)
        if (val < min * 0.8 || val > max * 1.2) hasCritical = true;
        else if (val < min || val > max) hasWarning = true;
      });
    });

    if (hasCritical) return 'critical';
    if (hasWarning) return 'warning';
    return 'optimal';
  };

  return (
    <PlantContext.Provider value={{ 
      plants, 
      addPlant, 
      getGlobalStatus,
      isAuthenticated,
      isProMember,
      login,
      logout,
      upgradeToPro
    }}>
      {children}
    </PlantContext.Provider>
  );
};
