import React from 'react';
import { X, ShieldCheck, Sparkles, Heart, EyeOff, Lock } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="privacy-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
    >
      <div
        id="privacy-modal-card"
        className="relative w-full max-w-md p-6 bg-stone-900 border border-emerald-500/40 rounded-3xl shadow-2xl text-stone-200"
      >
        <button
          id="privacy-modal-close-button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Privacy & Safety</h3>
            <p className="text-xs text-stone-400">How Face to Wild keeps you safe</p>
          </div>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-stone-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">No Persistent Storage</strong>
              <span>Camera frames are analyzed on-demand in volatile memory and immediately discarded. Your photos are never saved to a database or disk.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Strict AI Safety Guardrails</strong>
              <span>Gemini does NOT identify individuals and does NOT infer or classify race, ethnicity, nationality, gender, age, health, attractiveness, religion, or sexual orientation.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Purely for Fun</strong>
              <span>This is an entertaining, whimsical visual comparison based on broad facial geometry (such as smile width, eye shape, and expressive poise), not a scientific or biological determination.</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-400 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500" /> Powered by Gemini AI
          </span>
          <button
            id="privacy-modal-ack-button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition cursor-pointer"
          >
            Got it, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};
