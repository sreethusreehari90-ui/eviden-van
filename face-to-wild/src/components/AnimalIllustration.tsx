import React from 'react';
import { AnimalProfile } from '../types';

interface AnimalIllustrationProps {
  animal: AnimalProfile;
  className?: string;
  size?: number;
}

export const AnimalIllustration: React.FC<AnimalIllustrationProps> = ({
  animal,
  className = '',
  size = 180,
}) => {
  const { name, colorTheme, emoji } = animal;
  const primary = colorTheme.primary;
  const accent = colorTheme.accent;

  // Render dedicated vector art based on the animal name
  const renderVector = () => {
    switch (name) {
      case 'Fox':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none">
            <defs>
              <linearGradient id="foxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            {/* Ears */}
            <polygon points="25,48 10,12 45,30" fill="#c2410c" />
            <polygon points="95,48 110,12 75,30" fill="#c2410c" />
            <polygon points="27,42 16,18 42,28" fill="#ffedd5" />
            <polygon points="93,42 104,18 78,28" fill="#ffedd5" />
            {/* Head */}
            <polygon points="60,105 18,48 102,48" fill="url(#foxGrad)" />
            {/* White cheeks */}
            <polygon points="60,105 18,48 42,75" fill="#fef08a" opacity="0.9" />
            <polygon points="60,105 102,48 78,75" fill="#fef08a" opacity="0.9" />
            {/* Eyes */}
            <ellipse cx="40" cy="52" rx="6" ry="3" fill="#1e1b4b" transform="rotate(-15 40 52)" />
            <ellipse cx="80" cy="52" rx="6" ry="3" fill="#1e1b4b" transform="rotate(15 80 52)" />
            <circle cx="41" cy="51" r="1.5" fill="#ffffff" />
            <circle cx="79" cy="51" r="1.5" fill="#ffffff" />
            {/* Nose & Whiskers */}
            <circle cx="60" cy="98" r="4.5" fill="#0f172a" />
            <line x1="28" y1="78" x2="6" y2="74" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
            <line x1="28" y1="84" x2="8" y2="86" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
            <line x1="92" y1="78" x2="114" y2="74" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
            <line x1="92" y1="84" x2="112" y2="86" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
          </svg>
        );

      case 'Lion':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none">
            <defs>
              <radialGradient id="lionMane" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </radialGradient>
            </defs>
            {/* Mane */}
            <circle cx="60" cy="60" r="50" fill="url(#lionMane)" />
            {/* Mane bursts */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <polygon
                key={deg}
                points="55,8 65,8 60,0"
                fill="#f59e0b"
                transform={`rotate(${deg} 60 60)`}
              />
            ))}
            {/* Face */}
            <ellipse cx="60" cy="65" rx="34" ry="32" fill="#fde047" />
            {/* Snout */}
            <ellipse cx="60" cy="76" rx="16" ry="14" fill="#fef9c3" />
            <polygon points="53,70 67,70 60,78" fill="#78350f" />
            <line x1="60" y1="78" x2="60" y2="86" stroke="#78350f" strokeWidth="2" />
            <path d="M52 84 Q60 90 68 84" stroke="#78350f" strokeWidth="2" fill="none" />
            {/* Eyes */}
            <ellipse cx="44" cy="58" rx="5" ry="4" fill="#78350f" />
            <ellipse cx="76" cy="58" rx="5" ry="4" fill="#78350f" />
            <circle cx="45" cy="57" r="1.5" fill="#ffffff" />
            <circle cx="75" cy="57" r="1.5" fill="#ffffff" />
            {/* Ears */}
            <circle cx="34" cy="38" r="9" fill="#ca8a04" />
            <circle cx="86" cy="38" r="9" fill="#ca8a04" />
            <circle cx="34" cy="38" r="5" fill="#fef08a" />
            <circle cx="86" cy="38" r="5" fill="#fef08a" />
          </svg>
        );

      case 'Panda':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none">
            {/* Ears */}
            <circle cx="28" cy="30" r="14" fill="#0f172a" />
            <circle cx="92" cy="30" r="14" fill="#0f172a" />
            {/* Head */}
            <circle cx="60" cy="65" r="42" fill="#f8fafc" stroke="#334155" strokeWidth="1" />
            {/* Eye Patches */}
            <ellipse cx="42" cy="60" rx="12" ry="10" fill="#0f172a" transform="rotate(-20 42 60)" />
            <ellipse cx="78" cy="60" rx="12" ry="10" fill="#0f172a" transform="rotate(20 78 60)" />
            {/* Eyes */}
            <circle cx="43" cy="59" r="4" fill="#ffffff" />
            <circle cx="77" cy="59" r="4" fill="#ffffff" />
            <circle cx="44" cy="59" r="2" fill="#0f172a" />
            <circle cx="76" cy="59" r="2" fill="#0f172a" />
            {/* Nose & Mouth */}
            <ellipse cx="60" cy="74" rx="6" ry="4" fill="#0f172a" />
            <path d="M53 82 Q60 88 67 82" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Cheeks */}
            <ellipse cx="32" cy="72" rx="6" ry="4" fill="#f472b6" opacity="0.4" />
            <ellipse cx="88" cy="72" rx="6" ry="4" fill="#f472b6" opacity="0.4" />
          </svg>
        );

      case 'Tiger':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none">
            <ellipse cx="60" cy="62" rx="42" ry="38" fill="#f59e0b" />
            {/* Ears */}
            <polygon points="20,40 12,16 38,26" fill="#d97706" />
            <polygon points="100,40 108,16 82,26" fill="#d97706" />
            <polygon points="22,36 17,22 34,28" fill="#ffffff" />
            <polygon points="98,36 103,22 86,28" fill="#ffffff" />
            {/* Stripes */}
            <polygon points="60,26 57,38 63,38" fill="#1c1917" />
            <polygon points="46,30 46,40 50,38" fill="#1c1917" />
            <polygon points="74,30 74,40 70,38" fill="#1c1917" />
            <polygon points="20,54 36,58 20,62" fill="#1c1917" />
            <polygon points="100,54 84,58 100,62" fill="#1c1917" />
            {/* Snout */}
            <ellipse cx="60" cy="74" rx="16" ry="12" fill="#ffffff" />
            <polygon points="54,69 66,69 60,75" fill="#ea580c" />
            <path d="M53 79 Q60 84 67 79" stroke="#1c1917" strokeWidth="2" fill="none" />
            {/* Eyes */}
            <ellipse cx="42" cy="56" rx="6" ry="4" fill="#10b981" />
            <ellipse cx="78" cy="56" rx="6" ry="4" fill="#10b981" />
            <circle cx="42" cy="56" r="2.5" fill="#1c1917" />
            <circle cx="78" cy="56" r="2.5" fill="#1c1917" />
          </svg>
        );

      case 'Owl':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none">
            {/* Body */}
            <ellipse cx="60" cy="65" rx="42" ry="46" fill="#7c3aed" />
            {/* Feather details */}
            <path d="M40 85 Q60 95 80 85" stroke="#a78bfa" strokeWidth="3" fill="none" opacity="0.6" />
            <path d="M45 92 Q60 100 75 92" stroke="#a78bfa" strokeWidth="3" fill="none" opacity="0.6" />
            {/* Ear Tufts */}
            <polygon points="26,30 18,8 42,24" fill="#5b21b6" />
            <polygon points="94,30 102,8 78,24" fill="#5b21b6" />
            {/* Giant Eyes */}
            <circle cx="42" cy="52" r="18" fill="#fef08a" stroke="#4c1d95" strokeWidth="3" />
            <circle cx="78" cy="52" r="18" fill="#fef08a" stroke="#4c1d95" strokeWidth="3" />
            <circle cx="42" cy="52" r="9" fill="#0f172a" />
            <circle cx="78" cy="52" r="9" fill="#0f172a" />
            <circle cx="45" cy="49" r="3" fill="#ffffff" />
            <circle cx="81" cy="49" r="3" fill="#ffffff" />
            {/* Beak */}
            <polygon points="56,60 64,60 60,74" fill="#f59e0b" />
          </svg>
        );

      case 'Eagle':
      case 'Falcon':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none">
            {/* Head */}
            <path d="M25 65 C25 35 45 20 70 20 C90 20 102 38 100 55 C98 70 85 85 70 95 C45 95 25 85 25 65 Z" fill="#0284c7" />
            <path d="M30 60 C32 38 48 26 72 26 C88 26 95 38 94 50 C80 50 65 60 55 75 Z" fill="#f8fafc" />
            {/* Curved Beak */}
            <path d="M86 48 C96 46 112 52 110 70 C104 68 96 66 84 62 Z" fill="#eab308" />
            {/* Piercing Eye */}
            <circle cx="68" cy="46" r="6" fill="#facc15" />
            <circle cx="69" cy="46" r="3" fill="#0f172a" />
            <circle cx="70" cy="45" r="1" fill="#ffffff" />
            <path d="M60 40 Q70 42 78 44" stroke="#0f172a" strokeWidth="2.5" fill="none" />
          </svg>
        );

      case 'Butterfly':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none">
            {/* Left Wings */}
            <path d="M58 55 C40 20 10 25 12 55 C14 75 40 70 58 65 Z" fill="#ec4899" opacity="0.85" />
            <path d="M58 65 C35 70 20 85 25 105 C32 112 55 90 58 75 Z" fill="#f43f5e" opacity="0.85" />
            {/* Right Wings */}
            <path d="M62 55 C80 20 110 25 108 55 C106 75 80 70 62 65 Z" fill="#ec4899" opacity="0.85" />
            <path d="M62 65 C85 70 100 85 95 105 C88 112 65 90 62 75 Z" fill="#f43f5e" opacity="0.85" />
            {/* Wing patterns */}
            <circle cx="34" cy="48" r="7" fill="#fdf2f8" opacity="0.8" />
            <circle cx="86" cy="48" r="7" fill="#fdf2f8" opacity="0.8" />
            <circle cx="42" cy="85" r="5" fill="#fde047" opacity="0.8" />
            <circle cx="78" cy="85" r="5" fill="#fde047" opacity="0.8" />
            {/* Body */}
            <ellipse cx="60" cy="65" rx="3.5" ry="25" fill="#1e1b4b" />
            <circle cx="60" cy="38" r="4.5" fill="#1e1b4b" />
            {/* Antennae */}
            <path d="M58 35 Q50 20 44 22" stroke="#1e1b4b" strokeWidth="1.5" fill="none" />
            <path d="M62 35 Q70 20 76 22" stroke="#1e1b4b" strokeWidth="1.5" fill="none" />
          </svg>
        );

      case 'Wolf':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" fill="none">
            {/* Ears */}
            <polygon points="26,45 15,10 46,28" fill="#312e81" />
            <polygon points="94,45 105,10 74,28" fill="#312e81" />
            <polygon points="28,40 20,18 42,27" fill="#c7d2fe" />
            <polygon points="92,40 100,18 78,27" fill="#c7d2fe" />
            {/* Head */}
            <polygon points="60,110 20,45 100,45" fill="#4338ca" />
            <polygon points="60,110 20,45 42,65" fill="#6366f1" />
            <polygon points="60,110 100,45 78,65" fill="#6366f1" />
            <polygon points="60,105 38,72 82,72" fill="#e0e7ff" />
            {/* Eyes */}
            <ellipse cx="42" cy="52" rx="6" ry="3.5" fill="#eab308" transform="rotate(-10 42 52)" />
            <ellipse cx="78" cy="52" rx="6" ry="3.5" fill="#eab308" transform="rotate(10 78 52)" />
            <circle cx="43" cy="52" r="1.5" fill="#0f172a" />
            <circle cx="77" cy="52" r="1.5" fill="#0f172a" />
            {/* Nose */}
            <polygon points="56,98 64,98 60,104" fill="#0f172a" />
          </svg>
        );

      default:
        // Generic high-polish animal badge with vibrant glowing ring and giant emoji
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="absolute inset-2 rounded-full blur-xl opacity-50"
              style={{ backgroundColor: primary }}
            />
            <div
              className="relative w-4/5 h-4/5 rounded-full border-2 flex items-center justify-center text-6xl md:text-7xl select-none"
              style={{
                borderColor: accent,
                background: `radial-gradient(circle, ${primary}22 0%, rgba(15,23,42,0.85) 100%)`,
                boxShadow: `0 0 25px ${colorTheme.glow}`,
              }}
            >
              <span>{emoji}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Bioluminescent aura behind artwork */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse pointer-events-none"
        style={{ backgroundColor: primary }}
      />
      <div className="relative w-full h-full flex items-center justify-center">
        {renderVector()}
      </div>
    </div>
  );
};
