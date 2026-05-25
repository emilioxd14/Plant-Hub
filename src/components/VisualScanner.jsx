import React, { useState, useEffect } from 'react';
import { Camera, ScanLine } from 'lucide-react';

const VisualScanner = ({ plant }) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const startScan = () => {
    setScanning(true);
    setScanResult(null);
    
    // Simulate scan duration
    setTimeout(() => {
      setScanning(false);
      setScanResult({
        health: "98%",
        issues: "None detected",
        chlorophyll: "Optimal"
      });
    }, 3000);
  };

  return (
    <div className="bg-plant-card border border-emerald/15 rounded-2xl p-6 backdrop-blur-xl flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-outfit text-white">Visual Health Analysis</h3>
        <button 
          onClick={startScan}
          disabled={scanning}
          className="flex items-center gap-2 bg-emerald/10 hover:bg-emerald/20 text-emerald px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 text-sm font-outfit"
        >
          <Camera className="w-4 h-4" />
          {scanning ? 'Scanning...' : 'Start Scan'}
        </button>
      </div>

      <div className="relative flex-grow bg-dark-bg/50 rounded-xl overflow-hidden min-h-[200px] flex items-center justify-center border border-white/5">
        {/* Placeholder for camera feed */}
        <div className="text-white/20 flex flex-col items-center">
          <Camera className="w-12 h-12 mb-2 opacity-50" />
          <span className="font-space text-sm">Camera Feed Simulated</span>
        </div>

        {/* Scan Overlay Animation */}
        {scanning && (
          <>
            <div className="absolute inset-0 border-2 border-emerald/50 m-4 rounded-lg pointer-events-none" />
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald pointer-events-none" />
            
            {/* Scanning line */}
            <div className="absolute left-0 right-0 h-0.5 bg-cyber-mint shadow-[0_0_10px_#2dd4bf] animate-scan-line pointer-events-none" />
            <div className="absolute inset-0 bg-emerald/5 animate-pulse pointer-events-none" />
          </>
        )}

        {scanResult && !scanning && (
          <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in p-6 text-center">
            <ScanLine className="w-8 h-8 text-emerald mb-3" />
            <h4 className="text-white font-outfit text-lg mb-4">Analysis Complete</h4>
            <div className="grid grid-cols-2 gap-4 w-full max-w-[200px]">
              <div className="bg-white/5 p-2 rounded">
                <span className="block text-xs text-white/50 font-space">Health</span>
                <span className="text-emerald font-outfit">{scanResult.health}</span>
              </div>
              <div className="bg-white/5 p-2 rounded">
                <span className="block text-xs text-white/50 font-space">Issues</span>
                <span className="text-white font-outfit">{scanResult.issues}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualScanner;
