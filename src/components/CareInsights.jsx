import React from 'react';
import { BrainCircuit } from 'lucide-react';

const CareInsights = ({ plant }) => {
  // Generate insights based on mock RAG and telemetry context
  const getInsight = () => {
    const { moisture, light } = plant.currentTelemetry;
    const { optimalThresholds } = plant;

    let insight = `The ${plant.species} is generally performing well. `;
    if (moisture < optimalThresholds.moisture.min) {
      insight = `Alert: Moisture level is critically low (${moisture}%). The RAG model suggests immediate watering to prevent root desiccation for ${plant.species}. `;
    } else if (moisture > optimalThresholds.moisture.max) {
      insight = `Warning: Soil is oversaturated (${moisture}%). Suspend watering to prevent root rot. `;
    }

    if (light < optimalThresholds.light.min) {
      insight += `Additionally, light levels are below the ${optimalThresholds.light.min}lx threshold. Consider moving it to a brighter location.`;
    }

    return insight;
  };

  return (
    <div className="bg-gradient-to-br from-emerald/10 to-transparent border border-emerald/20 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald/20 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-emerald" />
        </div>
        <h3 className="font-outfit text-white">AI Care Insights</h3>
      </div>
      
      <p className="font-space text-sm text-white/80 leading-relaxed">
        {/* Safely rendering text, no dangerouslySetInnerHTML */}
        {getInsight()}
      </p>
    </div>
  );
};

export default CareInsights;
