import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Search, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const FIRST_VISIT_KEY = 'portfolio-first-visit';
const DOUBLE_TAP_DELAY_MS = 280;

declare global {
  interface Window {
    startWalkthrough?: () => void;
    replayWalkthrough?: () => void;
  }
}

const isNestedInteractiveTarget = (target: EventTarget | null, currentTarget: EventTarget | null) => {
  if (!(target instanceof Element) || !(currentTarget instanceof Element)) {
    return false;
  }

  if (target === currentTarget) {
    return false;
  }

  const interactive = target.closest('a,button,input,textarea,select,label,[role="button"],[role="link"],[contenteditable="true"]');
  return Boolean(interactive && interactive !== currentTarget);
};

// Terminal Typing Animation Component
const TerminalTyping: React.FC<{ lines: string[]; speed?: number }> = ({ lines, speed = 50 }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = (newLines[currentLine] || '') + line[currentChar];
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines, speed]);

  return (
    <div className="font-mono text-[10px] space-y-0.5">
      {displayedLines.map((line, i) => (
        <div key={i} className="flex items-start gap-1">
          <span className="text-green-500">$</span>
          <span>{line}</span>
          {i === displayedLines.length - 1 && currentLine < lines.length && (
            <span className="w-1.5 h-3 bg-green-400 animate-pulse ml-0.5" />
          )}
        </div>
      ))}
    </div>
  );
};

// Network Scanning Animation Component
const NetworkScanning: React.FC = () => {
  return (
    <div className="relative h-12 w-full bg-slate-950/50 rounded overflow-hidden border border-slate-800">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={`h${i}`} className="absolute w-full h-px bg-cyan-900" style={{ top: `${20 + i * 15}%` }} />
        ))}
        {[...Array(8)].map((_, i) => (
          <div key={`v${i}`} className="absolute h-full w-px bg-cyan-900" style={{ left: `${10 + i * 12}%` }} />
        ))}
      </div>

      {/* Pulsing nodes */}
      <motion.div
        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
        style={{ top: '30%', left: '20%' }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
        style={{ top: '60%', left: '50%' }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.div
        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
        style={{ top: '40%', left: '75%' }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.line
          x1="20%"
          y1="30%"
          x2="50%"
          y2="60%"
          stroke="rgba(6, 182, 212, 0.5)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.line
          x1="50%"
          y1="60%"
          x2="75%"
          y2="40%"
          stroke="rgba(6, 182, 212, 0.5)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />
      </svg>

      {/* Scanning text */}
      <motion.div
        className="absolute bottom-1 left-2 text-[8px] font-mono text-cyan-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scanning network nodes...
      </motion.div>
    </div>
  );
};

export const Walkthrough = () => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [position, setPosition] = useState<'left' | 'right' | 'bottom'>('bottom');

  const startWalkthrough = useCallback(() => {
    setStep(0);
    setIsVisible(true);
  }, []);

  // Check first visit on mount
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem(FIRST_VISIT_KEY);
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  // Update target position
  const updateTarget = useCallback(() => {
    if (!isVisible) return;

    let el: HTMLElement | null = null;
    if (step === 0) el = document.getElementById('header-mode-btn');
    else if (step === 1) el = document.getElementById('header-mode-btn');
    else if (step === 2) el = document.getElementById('header-search-btn');

    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);

      const isNearRight = rect.right > window.innerWidth - 280;
      const isNearTop = rect.top < 200;

      if (isNearTop && isNearRight) {
        setPosition('left');
      } else if (isNearRight) {
        setPosition('left');
      } else {
        setPosition('right');
      }
    }
  }, [step, isVisible]);

  useEffect(() => {
    updateTarget();
    window.addEventListener('resize', updateTarget);
    window.addEventListener('scroll', updateTarget);
    return () => {
      window.removeEventListener('resize', updateTarget);
      window.removeEventListener('scroll', updateTarget);
    };
  }, [updateTarget]);

  const finishWalkthrough = () => {
    setIsVisible(false);
    setStep(0);
    localStorage.setItem(FIRST_VISIT_KEY, 'true');
  };

  const handleNext = () => {
    if (step < 2) {
      setStep((s) => s + 1);
    } else {
      finishWalkthrough();
    }
  };

  useEffect(() => {
    window.startWalkthrough = startWalkthrough;
    window.replayWalkthrough = startWalkthrough;
    return () => {
      delete window.startWalkthrough;
      delete window.replayWalkthrough;
    };
  }, [startWalkthrough]);

  if (!isVisible || !targetRect) return null;

  // Calculate tooltip styles based on position
  const getTooltipStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      zIndex: 100000,
    };

    if (position === 'left') {
      return {
        ...base,
        top: targetRect.top,
        right: window.innerWidth - targetRect.left + 16,
        transform: 'translateY(-50%)',
      };
    }

    if (position === 'right') {
      return {
        ...base,
        top: targetRect.top,
        left: targetRect.right + 16,
        transform: 'translateY(-50%)',
      };
    }

    return {
      ...base,
      top: targetRect.bottom + 16,
      left: targetRect.left + targetRect.width / 2,
      transform: 'translateX(-50%)',
    };
  };

  // Get mode-specific colors
  const getAccentColor = () => {
    if (step === 0) return 'rgba(34, 197, 94, 0.8)'; // Green for Dev
    if (step === 1) return 'rgba(6, 182, 212, 0.8)'; // Cyan for Cyber
    return 'rgba(96, 165, 250, 0.8)'; // Blue for Command
  };

  const getGlowColor = () => {
    if (step === 0) return '0 0 20px rgba(34, 197, 94, 0.5)';
    if (step === 1) return '0 0 20px rgba(6, 182, 212, 0.5)';
    return '0 0 20px rgba(96, 165, 250, 0.5)';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[99999] pointer-events-none">
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: position === 'left' ? 10 : position === 'right' ? -10 : 0, y: position === 'left' || position === 'right' ? 0 : -10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            key={step}
            className="pointer-events-auto cursor-pointer"
            style={getTooltipStyle()}
            onClick={handleNext}
          >
            <div
              className="relative max-w-[260px] rounded-xl p-4 shadow-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${getAccentColor()}`,
                boxShadow: getGlowColor(),
              }}
            >
              {/* Arrow */}
              {position === 'right' && (
                <div
                  className="absolute top-1/2 -left-2 w-4 h-4 rotate-45"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    borderTop: `1px solid ${getAccentColor()}`,
                    borderLeft: `1px solid ${getAccentColor()}`,
                    transform: 'translateY(-50%) rotate(45deg)',
                  }}
                />
              )}
              {position === 'left' && (
                <div
                  className="absolute top-1/2 -right-2 w-4 h-4"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    borderBottom: `1px solid ${getAccentColor()}`,
                    borderRight: `1px solid ${getAccentColor()}`,
                    transform: 'translateY(-50%) rotate(45deg)',
                  }}
                />
              )}

              {/* Content */}
              <div className="relative z-10 space-y-3">
                {step === 0 && (
                  <>
                    <div className="flex items-center gap-2 text-green-400 font-bold font-mono">
                      <Terminal className="w-4 h-4" />
                      <span>Developer Mode</span>
                    </div>
                    <p className="text-xs text-gray-300 font-mono leading-relaxed">
                      Switch to Developer Mode to explore programming-focused features.
                    </p>
                    <div className="bg-slate-950/80 rounded border border-green-900/50 p-2 font-mono text-[10px] text-green-400">
                      <TerminalTyping
                        lines={['Initializing dev environment...', 'Loading modules...', 'Ready.']}
                        speed={40}
                      />
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">Click to continue -&gt;</div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
                      <Shield className="w-4 h-4" />
                      <span>Cybersecurity Mode</span>
                    </div>
                    <p className="text-xs text-gray-300 font-mono leading-relaxed">
                      Activate Cyber Mode to reveal security tools and network insights.
                    </p>
                    <NetworkScanning />
                    <div className="text-[10px] text-gray-500 font-mono">Click to continue -&gt;</div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="flex items-center gap-2 text-blue-400 font-bold font-mono">
                      <Search className="w-4 h-4" />
                      <span>Command Center</span>
                    </div>
                    <p className="text-xs text-gray-300 font-mono leading-relaxed">
                      Open the command palette to navigate using terminal-style commands.
                    </p>
                    <div className="bg-slate-950/80 rounded border border-blue-900/50 p-2 font-mono text-[10px]">
                      <div className="text-green-400">$ whoami</div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white"
                      >
                        Junior Lespikius<span className="w-1.5 h-3 bg-green-400 animate-pulse inline-block ml-0.5" />
                      </motion.div>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">Click to finish</div>
                  </>
                )}
              </div>

              {/* Skip Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  finishWalkthrough();
                }}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

          {/* Highlight Ring */}
          <motion.div
            className="absolute pointer-events-none rounded-lg"
            style={{
              top: targetRect.top - 6,
              left: targetRect.left - 6,
              width: targetRect.width + 12,
              height: targetRect.height + 12,
              border: `2px solid ${getAccentColor()}`,
              boxShadow: getGlowColor(),
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export const WalkthroughReplaySafeZone = () => {
  const { theme, mode } = useTheme();
  const [showHint, setShowHint] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const lastTapRef = useRef(0);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
  }, []);

  const triggerReplay = useCallback(() => {
    window.startWalkthrough?.();
  }, []);

  const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isNestedInteractiveTarget(e.target, e.currentTarget)) {
      return;
    }

    triggerReplay();
    setShowHint(false);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (isNestedInteractiveTarget(e.target, e.currentTarget)) {
      return;
    }

    if (e.changedTouches.length !== 1) {
      return;
    }

    const now = Date.now();
    if (now - lastTapRef.current <= DOUBLE_TAP_DELAY_MS) {
      lastTapRef.current = 0;
      triggerReplay();
      setShowHint(false);
      return;
    }

    lastTapRef.current = now;
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        triggerReplay();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [triggerReplay]);

  const tone =
    mode === 'cyber'
      ? 'border-cyan-400/70 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.35)] text-cyan-100'
      : mode === 'dev'
        ? 'border-green-400/70 bg-green-400/10 shadow-[0_0_20px_rgba(74,222,128,0.35)] text-green-100'
        : theme === 'dark'
          ? 'border-slate-300/50 bg-slate-200/10 shadow-[0_0_16px_rgba(148,163,184,0.3)] text-slate-100'
          : 'border-blue-300/70 bg-blue-200/20 shadow-[0_0_16px_rgba(59,130,246,0.2)] text-slate-900';

  return (
    <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-[60]">
      <motion.button
        type="button"
        aria-label="Replay Walkthrough Trigger"
        className="relative w-14 h-14 rounded-full pointer-events-auto touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        onDoubleClick={handleDoubleClick}
        onTouchEnd={handleTouchEnd}
        whileTap={{ scale: 0.96 }}
      >
        <span className="absolute inset-0 rounded-full bg-transparent" />

        <motion.span
          initial={{ opacity: 0.2, scale: 0.85 }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.85, 1.05, 0.85] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute inset-0 rounded-full border ${tone}`}
        />
      </motion.button>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`pointer-events-none absolute bottom-16 right-0 max-w-[240px] rounded-lg border px-3 py-2 text-[11px] leading-snug backdrop-blur-md ${tone}`}
          >
            <p>{'\u{1F4A1} Tip: Double-click here to replay walkthrough anytime'}</p>
            {isTouchDevice && <p className="mt-1 opacity-80">On mobile, double-tap this corner.</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
