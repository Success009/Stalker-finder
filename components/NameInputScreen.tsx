import React, { useState } from 'react';

export const NameInputScreen: React.FC<{ onStart: (name: string) => void }> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden">
        <style>{`
            .bg-grid {
                background-image:
                    linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
                background-size: 2rem 2rem;
                animation: pan-grid 20s linear infinite;
            }
            @keyframes pan-grid {
                0% { background-position: 0 0; }
                100% { background-position: 2rem 2rem; }
            }
        `}</style>
        <div className="absolute inset-0 bg-grid z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-0"></div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl font-mono text-cyan-300 mb-2">
            [STALKER_PROTOCOL::INIT]
        </h1>
        <p className="text-slate-400 mb-8 md:text-lg">
          Enter your name and I will find out your stalker.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="> ENTER YOUR NAME_"
            className="w-full px-5 py-3 text-center text-lg text-white bg-slate-800/50 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 placeholder-slate-500 font-mono"
            required
            autoCapitalize="words"
            autoComplete="name"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full px-5 py-3 text-lg font-bold text-slate-900 bg-cyan-400 rounded-md hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-300 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  );
};