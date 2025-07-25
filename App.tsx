
import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { NameInputScreen } from './components/NameInputScreen';
import { HackingScreen } from './components/HackingScreen';
import { RevealScreen } from './components/RevealScreen';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [userName, setUserName] = useState<string>('');

  const handleStart = useCallback((name: string) => {
    setUserName(name);
    setAppState(AppState.PROCESSING);
  }, []);

  const handleComplete = useCallback(() => {
    setAppState(AppState.REVEALED);
  }, []);

  const handleReset = useCallback(() => {
    setUserName('');
    setAppState(AppState.IDLE);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.PROCESSING:
        return <HackingScreen userName={userName} onComplete={handleComplete} />;
      case AppState.REVEALED:
        return <RevealScreen userName={userName} onReset={handleReset} />;
      case AppState.IDLE:
      default:
        return <NameInputScreen onStart={handleStart} />;
    }
  };

  return (
    <main className="bg-slate-900 text-white min-h-screen w-full">
      <div className="relative w-full min-h-screen">
          {renderContent()}
      </div>
    </main>
  );
};

export default App;
