import React, { useEffect, useState } from 'react';
import { Sparkles, Compass, Eye, Search } from 'lucide-react';

interface LoadingScannerProps {
  capturedImage?: string | null;
}

const SCAN_MESSAGES = [
  'Looking into the wild...',
  'Analyzing visible facial features...',
  'Searching the animal kingdom...',
  'Finding your wild twin...',
  'Tuning into jungle frequencies...',
  'Almost there...',
];

export const LoadingScanner: React.FC<LoadingScannerProps> = ({ capturedImage }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % SCAN_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="scanner-loading-screen"
      className="relative flex flex-col items-center justify-center w-full max-w-lg mx-auto p-6 text-center"
    >
      {/* Visual scanning frame */}
      <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/60 bg-stone-900/90 mb-8 flex items-center justify-center">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured face preview"
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-emerald-400 bg-stone-950">
            <Eye className="w-12 h-12 mb-2 animate-pulse text-emerald-400" />
            <span className="text-xs text-stone-400">Capturing face frame...</span>
          </div>
        )}

        {/* Ambient Dark Jungle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/40 pointer-events-none" />

        {/* Target Reticle in Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 rounded-full border border-dashed border-emerald-400/40 animate-spin" style={{ animationDuration: '14s' }} />
          <div className="absolute w-36 h-36 rounded-full border border-emerald-400/30" />
        </div>

        {/* Corner Reticle Accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-emerald-400" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-emerald-400" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-emerald-400" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-emerald-400" />

        {/* Animated Neon Laser Scan Line */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce duration-1000 opacity-90" />

        {/* Radar Ping Pulse */}
        <div className="absolute inset-0 rounded-3xl border border-emerald-400/60 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
      </div>

      {/* Dynamic Animated Status Text */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 animate-spin text-emerald-400" style={{ animationDuration: '4s' }} />
          <span>GEMINI MULTIMODAL MATCHING</span>
        </div>

        <h3
          id="scanner-dynamic-heading"
          className="text-2xl md:text-3xl font-bold tracking-tight text-white transition-opacity duration-300 min-h-[40px] flex items-center justify-center"
        >
          {SCAN_MESSAGES[messageIndex]}
        </h3>

        <p className="text-sm text-stone-400 max-w-sm mx-auto leading-relaxed">
          Comparing visible visual symmetry, eye contours, and expressive energy to members of the animal kingdom.
        </p>
      </div>

      {/* Subtle Progress Bar */}
      <div className="w-48 h-1.5 bg-stone-800 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full animate-pulse w-full" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-stone-500">
        <span className="flex items-center gap-1">
          <Compass className="w-3 h-3 text-emerald-500" /> Privacy preserved
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Search className="w-3 h-3 text-emerald-500" /> 100% ephemeral
        </span>
      </div>
    </div>
  );
};
