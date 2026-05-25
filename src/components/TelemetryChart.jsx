import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const TelemetryChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-plant-card border border-emerald/15 rounded-2xl p-6 h-80 backdrop-blur-xl">
      <h3 className="font-outfit text-white mb-4">Historical Telemetry (24h)</h3>
      <div className="w-full h-full pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
            
            <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" tick={{fill: '#10b981', fontSize: 12}} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" tick={{fill: '#fbbf24', fontSize: 12}} tickLine={false} axisLine={false} />
            
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(9, 17, 14, 0.9)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px' }}
              itemStyle={{ fontFamily: 'Space Grotesk' }}
              labelStyle={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Outfit' }}
            />
            <Legend wrapperStyle={{ fontFamily: 'Outfit', fontSize: 12, paddingTop: '10px' }} />
            
            <Line yAxisId="left" type="monotone" dataKey="moisture" name="Moisture (%)" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#10b981' }} />
            <Line yAxisId="right" type="monotone" dataKey="light" name="Light (lx)" stroke="#fbbf24" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#fbbf24' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TelemetryChart;
