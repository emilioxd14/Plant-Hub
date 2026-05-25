import React from 'react';

export interface AlertBannerProps {
  alerts: string[]; // e.g., ["Water tank under 10%", "Monstera light levels critical"]
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ alerts }) => {
  const isHealthy = alerts.length === 0;

  return (
    <div className={`w-full mb-6 p-4 rounded-xl border-2 transition-all duration-300 ${
      isHealthy 
        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
        : 'bg-amber-950/20 border-amber-500/30 text-amber-300 shadow-sm animate-pulse-subtle'
    }`}>
      <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isHealthy ? 'text-emerald-400' : 'text-amber-500'}`}>
        {isHealthy ? 'System Status' : 'Active Interventions Required'}
      </h2>
      
      {isHealthy ? (
        <p className="text-sm font-medium flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          All systems running correctly.
        </p>
      ) : (
        <ul className="list-disc pl-5 text-sm font-medium space-y-1">
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertBanner;
