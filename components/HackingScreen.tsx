
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HACKING_MESSAGES, FRIENDS_LIST } from '../constants';
import { TerminalIcon } from './icons';

interface HackingScreenProps {
  userName: string;
  onComplete: () => void;
}

interface DataDumpProps {
  onComplete: () => void;
  onScroll: () => void;
}

const DataDump: React.FC<DataDumpProps> = ({ onComplete, onScroll }) => {
    const [visibleFriends, setVisibleFriends] = useState<string[]>([]);
    
    useEffect(() => {
        let index = 0;
        const interval = window.setInterval(() => {
            if (index < FRIENDS_LIST.length) {
                const friend = FRIENDS_LIST[index];
                const status = friend === 'Vijan Adhikari' ? '[MATCH_UNCERTAIN]' : '[NO_THREAT]';
                setVisibleFriends(prev => [...prev, `${friend.padEnd(25, ' ')} ${status}`]);
                index++;
            } else {
                window.clearInterval(interval);
                onComplete();
            }
        }, 80); // Fast scroll
        return () => window.clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        onScroll();
    }, [visibleFriends, onScroll]);

    return (
        <div className="text-xs text-amber-300/70">
            {visibleFriends.map((f, i) => <p key={i} className="whitespace-pre">{`  - ${f}`}</p>)}
        </div>
    );
};


export const HackingScreen: React.FC<HackingScreenProps> = ({ userName, onComplete }) => {
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<number | undefined>();
  const typingIntervalRef = useRef<number | undefined>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    const processMessage = (index: number) => {
        // Base case: All messages processed, now call onComplete.
        if (index >= HACKING_MESSAGES.length) {
            setProgress(100);
            // Short delay for finality before transitioning to the reveal screen
            timeoutRef.current = window.setTimeout(() => {
                onComplete();
            }, 500);
            return;
        }

        const message = HACKING_MESSAGES[index];
        const delay = message.delayBefore || (message.type === 'slow' ? 500 : 100);

        timeoutRef.current = window.setTimeout(() => {
            // Update progress as we begin processing each new message.
            setProgress(((index) / HACKING_MESSAGES.length) * 100);
            
            if (message.type === 'data') {
                const handleDataDumpComplete = () => {
                    // Wait 4 seconds after the data dump before proceeding.
                    timeoutRef.current = window.setTimeout(() => {
                        processMessage(index + 1);
                    }, 4000); 
                };
                setLines(prev => [...prev, <p key={`line-${index}-prompt`} className="text-sm md:text-base mb-1 opacity-70">{`> ${message.text}`}</p>, <DataDump key={`line-${index}-data`} onComplete={handleDataDumpComplete} onScroll={scrollToBottom} />]);
                return;
            }

            const lineKey = `line-${index}`;
            let currentText = '';
            setLines(prev => [...prev, <p key={lineKey} className="text-sm md:text-base text-white">{`> `}<span className="inline-block"></span></p>]);
            
            // Adjust typing speed based on message type for dramatic effect.
            const typingSpeed = message.type === 'fast' ? 20 : (message.type === 'final' ? 120 : 80);

            let charIndex = 0;
            if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);

            typingIntervalRef.current = window.setInterval(() => {
                if (charIndex < message.text.length) {
                    currentText += message.text[charIndex];
                    setLines(prev => {
                        const newLines = [...prev];
                        const lastLineNode = newLines[newLines.length - 1];

                        if (React.isValidElement(lastLineNode) && lastLineNode.key === lineKey) {
                            newLines[newLines.length - 1] = (
                                <p key={lineKey} className="text-sm md:text-base text-white">
                                    {`> `}
                                    <span className="inline-block">{currentText.replace('{userName}', userName)}</span>
                                    <span key="cursor" className="animate-pulse">_</span>
                                </p>
                            );
                        }
                        return newLines;
                    });
                    charIndex++;
                } else {
                    if(typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
                    typingIntervalRef.current = undefined;

                     setLines(prev => {
                        const newLines = [...prev];
                        const lastLineNode = newLines[newLines.length - 1];

                        if (React.isValidElement(lastLineNode) && lastLineNode.key === lineKey) {
                            newLines[newLines.length - 1] = <p key={lineKey} className="text-sm md:text-base mb-1 opacity-70">{`> ${currentText.replace('{userName}', userName)}`}</p>;
                        }
                        return newLines;
                    });
                    processMessage(index + 1);
                }
            }, typingSpeed);

        }, delay);
    };
    
    processMessage(0);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (typingIntervalRef.current) {
        window.clearInterval(typingIntervalRef.current);
      }
    };
  }, [userName, onComplete, scrollToBottom]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-mono text-green-400">
      <div className="w-full max-w-2xl bg-black/50 rounded-lg p-4 md:p-6 border border-green-900/50 shadow-2xl shadow-green-500/10">
        <div className="flex items-center gap-3 mb-4">
          <TerminalIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold text-green-300">STALKER_FINDER.EXE</h2>
        </div>
        <div className="h-64 md:h-96 overflow-y-auto pr-2" ref={scrollContainerRef}>
            {lines}
        </div>
        <div className="mt-4 pt-4 border-t border-green-900/50">
            <p className="text-sm text-green-300 mb-2">SYSTEM ANALYSIS: {Math.round(progress)}%</p>
            <div className="w-full bg-green-900/50 rounded-full h-2.5">
                <div 
                    className="bg-green-400 h-2.5 rounded-full transition-all duration-100 ease-linear" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
      </div>
    </div>
  );
};
