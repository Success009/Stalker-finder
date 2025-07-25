import React from 'react';
import { EyeIcon } from './icons';

interface RevealScreenProps {
  userName: string;
  onReset: () => void;
}

export const RevealScreen: React.FC<RevealScreenProps> = ({ userName, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center text-slate-100 animate-fadeIn">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        }
        .animate-fadeIn {
            animation: fadeIn 2s ease-out;
        }
        .animate-pulse-red {
            animation: pulse-red 2s infinite;
        }
      `}</style>
      <div className="w-full max-w-md mx-auto">
        <EyeIcon className="w-20 h-20 mx-auto text-red-500/80 mb-6 animate-pulse" />
        
        <p className="text-xl md:text-2xl text-slate-400 mb-8">
          The search is complete, {userName}.
        </p>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-6">
          Maybe I am your stalker.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-sm mx-auto">
          Because in order to find them... I had to find out everything about you.
        </p>

        <button
          onClick={onReset}
          className="px-8 py-3 text-lg font-bold text-white bg-red-600/80 rounded-full hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse-red"
        >
          START OVER
        </button>
      </div>
    </div>
  );
};