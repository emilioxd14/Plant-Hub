import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '../context/PlantContext';
import { Leaf, Lock, Mail } from 'lucide-react';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = usePlants();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication
    login();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-cyber-mint/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md bg-plant-card border border-emerald/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl z-10 relative">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-emerald/10 rounded-2xl flex items-center justify-center mb-4 border border-emerald/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Leaf className="w-8 h-8 text-emerald" />
          </div>
          <h1 className="text-3xl font-outfit font-bold tracking-tight">
            <span className="text-emerald">Plant</span>Hub
          </h1>
          <p className="font-space text-sm text-white/50 mt-2">Secure Botanical Telemetry</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-space text-xs text-white/70 mb-1" htmlFor="email">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-white/40" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 pl-10 text-white font-space focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 transition-all"
                placeholder="botanist@planthub.io"
              />
            </div>
          </div>

          <div>
            <label className="block font-space text-xs text-white/70 mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-white/40" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-2.5 px-4 pl-10 text-white font-space focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/50 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-emerald hover:bg-cyber-mint text-dark-bg font-outfit font-semibold rounded-xl transition-colors duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)]"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
