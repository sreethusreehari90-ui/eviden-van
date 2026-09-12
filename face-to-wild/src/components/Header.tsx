import React from 'react';
import { Shield, Sparkles, Compass } from 'lucide-react';

interface HeaderProps {
  onOpenPrivacy: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPrivacy }) => {
  return (
    <header className="relative w-full z-30 pt-4 pb-2 px-4 max-w-5xl mx-auto flex items-center justify-between">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
          <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-xl select-none">
            🐾
          </div>
        </div>

        <div>
          <h1
            id="app-title"
            className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2"
          >
            <span>Face to Wild</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold tracking-wider uppercase">
              AI MATCH
            </span>
          </h1>
          <p id="app-tagline" className="text-xs text-stone-400 font-medium">
            Show your face. Discover your wild side.
          </p>
        </div>
      </div>

      {/* Action / Privacy modal trigger */}
      <div className="flex items-center gap-2">
        <button
          id="header-privacy-button"
          onClick={onOpenPrivacy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-medium transition cursor-pointer"
          title="Privacy & How it works"
        >
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Privacy</span>
        </button>
      </div>
    </header>
  );
};
