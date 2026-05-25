export const mockPlants = [
  {
    id: "plant-001",
    species: "Monstera Deliciosa",
    name: "Living Room Monster",
    optimalThresholds: {
      moisture: { min: 40, max: 70 }, // Higher moisture
      light: { min: 2000, max: 10000 }, // Bright indirect
      temperature: { min: 18, max: 28 }, // 18-28 C
    },
    currentTelemetry: {
      moisture: 55, // Optimal
      light: 4500, // Optimal
      temperature: 22, // Optimal
    },
    history: Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`,
      moisture: 50 + Math.random() * 10,
      light: i > 6 && i < 18 ? 2000 + Math.random() * 6000 : 0,
      temperature: 20 + Math.random() * 4,
    })),
    image: "/mock-monstera.jpg" // Placeholder if needed
  },
  {
    id: "plant-002",
    species: "Snake Plant",
    name: "Office Corner",
    optimalThresholds: {
      moisture: { min: 10, max: 30 }, // Lower moisture
      light: { min: 500, max: 8000 }, // Versatile
      temperature: { min: 15, max: 30 },
    },
    currentTelemetry: {
      moisture: 35, // Warning (slightly high for snake plant)
      light: 800, // Optimal
      temperature: 24, // Optimal
    },
    history: Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`,
      moisture: 35 + Math.random() * 2,
      light: i > 7 && i < 17 ? 500 + Math.random() * 500 : 0,
      temperature: 22 + Math.random() * 3,
    })),
  },
  {
    id: "plant-003",
    species: "Fiddle Leaf Fig",
    name: "Ficus lyrata",
    optimalThresholds: {
      moisture: { min: 30, max: 60 },
      light: { min: 5000, max: 15000 }, // High light
      temperature: { min: 18, max: 26 },
    },
    currentTelemetry: {
      moisture: 20, // Critical (Too dry)
      light: 6000, // Optimal
      temperature: 21, // Optimal
    },
    history: Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`,
      moisture: 30 - i * 0.5, // gradually drying
      light: i > 8 && i < 16 ? 5000 + Math.random() * 8000 : 0,
      temperature: 21 + Math.random() * 2,
    })),
  }
];

export const queryRAGDatabase = async (species) => {
  // Simulate network delay and RAG DB query
  return new Promise((resolve) => {
    setTimeout(() => {
      const match = mockPlants.find(p => p.species.toLowerCase() === species.toLowerCase());
      if (match) {
        resolve({
          species: match.species,
          optimalThresholds: match.optimalThresholds,
          insight: `The ${match.species} prefers specific environmental ranges.`
        });
      } else {
        // Fallback generic info
        resolve({
          species: species,
          optimalThresholds: {
            moisture: { min: 20, max: 60 },
            light: { min: 1000, max: 5000 },
            temperature: { min: 15, max: 25 },
          },
          insight: `Generic profile applied for ${species}.`
        });
      }
    }, 800);
  });
};
