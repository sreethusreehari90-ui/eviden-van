import React, { useEffect, useState } from 'react';
import { Share2, RotateCcw, Sparkles, Check, Heart, ExternalLink, Download } from 'lucide-react';
import { AnimalProfile, AnimalCategory } from '../types';
import { AnimalIllustration } from './AnimalIllustration';
import { ConfettiCanvas } from './ConfettiCanvas';

interface ResultModalProps {
  matchName: string;
  category: AnimalCategory;
  score: number;
  reason: string;
  features?: string[];
  animal: AnimalProfile;
  capturedImage?: string | null;
  onTryAgain: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  matchName,
  category,
  score,
  reason,
  features = [],
  animal,
  capturedImage,
  onTryAgain,
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [revealStage, setRevealStage] = useState<'intro' | 'revealed'>('intro');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Smooth suspense reveal then score counter
  useEffect(() => {
    // Quick dramatic suspense beat (600ms)
    const introTimer = setTimeout(() => {
      setRevealStage('revealed');
    }, 650);

    return () => clearTimeout(introTimer);
  }, []);

  // Animate score from 0 to final score once revealed
  useEffect(() => {
    if (revealStage !== 'revealed') return;

    let current = 0;
    const stepTime = 18;
    const increment = Math.max(1, Math.ceil(score / 45));

    const counter = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(counter);
      } else {
        setDisplayScore(current);
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [revealStage, score]);

  const shareText = `I discovered my wild match! ${animal.emoji} I'm an ${score}% ${matchName} according to Face to Wild. 🐾\nDiscover your wild side at ${window.location.origin}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Face to Wild — I'm an ${score}% ${matchName}!`,
          text: `I discovered my wild match! ${animal.emoji} I'm an ${score}% ${matchName} according to Face to Wild. 🐾`,
          url: window.location.origin,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to clipboard
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      // Fallback manual input prompt
      const dummy = document.createElement('textarea');
      dummy.value = shareText;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

  const handleDownloadCard = () => {
    // Generates a quick client-rendered snapshot card canvas
    setDownloading(true);
    try {
      const cardCanvas = document.createElement('canvas');
      cardCanvas.width = 800;
      cardCanvas.height = 900;
      const ctx = cardCanvas.getContext('2d');
      if (ctx) {
        // Background dark gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 800, 900);
        bgGrad.addColorStop(0, '#0a100d');
        bgGrad.addColorStop(0.5, '#051b14');
        bgGrad.addColorStop(1, '#08140f');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 800, 900);

        // Neon border
        ctx.strokeStyle = animal.colorTheme.primary;
        ctx.lineWidth = 6;
        ctx.strokeRect(20, 20, 760, 860);

        // Header Title
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('FACE TO WILD 🐾', 400, 80);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px sans-serif';
        ctx.fillText('Show your face. Discover your wild side.', 400, 115);

        // Emoji & Badge
        ctx.font = '110px sans-serif';
        ctx.fillText(animal.emoji, 400, 250);

        // Name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 54px sans-serif';
        ctx.fillText(matchName.toUpperCase(), 400, 330);

        // Category pill
        ctx.fillStyle = animal.colorTheme.primary;
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(`${category.toUpperCase()} • ${animal.subtitle}`, 400, 375);

        // Score
        ctx.fillStyle = animal.colorTheme.accent;
        ctx.font = 'bold 72px sans-serif';
        ctx.fillText(`${score}% MATCH`, 400, 475);

        // Reason box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
        ctx.roundRect(80, 520, 640, 180, 20);
        ctx.fill();

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'italic 22px sans-serif';
        ctx.textAlign = 'center';
        // Wrap text
        const words = `"${reason}"`.split(' ');
        let line = '';
        let y = 570;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > 580 && n > 0) {
            ctx.fillText(line, 400, y);
            line = words[n] + ' ';
            y += 34;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 400, y);

        // Disclaimer
        ctx.fillStyle = '#64748b';
        ctx.font = '15px sans-serif';
        ctx.fillText('Just for fun — this is a playful visual match, not a scientific assessment.', 400, 770);
        ctx.fillText('Created with Face to Wild', 400, 800);

        // Download
        const link = document.createElement('a');
        link.download = `FaceToWild-${matchName}-${score}percent.png`;
        link.href = cardCanvas.toDataURL('image/png');
        link.click();
      }
    } catch (e) {
      console.error('Download error', e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <ConfettiCanvas
        active={revealStage === 'revealed'}
        primaryColor={animal.colorTheme.primary}
        accentColor={animal.colorTheme.accent}
      />

      <div
        id="result-modal-container"
        className="relative z-40 w-full max-w-xl mx-auto my-auto p-4 md:p-6 transition-all duration-500"
      >
        {revealStage === 'intro' ? (
          /* Dramatic suspense title screen */
          <div className="flex flex-col items-center justify-center min-h-[360px] text-center p-8 bg-stone-950/80 backdrop-blur-xl rounded-3xl border border-emerald-500/30 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mb-4 animate-bounce">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 animate-pulse">
              Your wild match is...
            </h2>
            <p className="text-sm text-stone-400 mt-2">Connecting facial cues to nature’s designs</p>
          </div>
        ) : (
          /* Full revealed result card */
          <div
            id="result-card"
            className="relative overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all duration-700 animate-in fade-in zoom-in-95"
            style={{
              borderColor: `${animal.colorTheme.primary}66`,
              boxShadow: `0 0 50px ${animal.colorTheme.glow}, 0 20px 40px rgba(0,0,0,0.8)`,
              background: `linear-gradient(175deg, rgba(15, 23, 20, 0.95) 0%, rgba(10, 16, 14, 0.98) 100%)`,
            }}
          >
            {/* Top decorative accent bar */}
            <div
              className="h-2 w-full"
              style={{
                background: `linear-gradient(90deg, ${animal.colorTheme.primary}, ${animal.colorTheme.accent}, ${animal.colorTheme.secondary})`,
              }}
            />

            <div className="p-6 md:p-8 flex flex-col items-center text-center relative">
              {/* Category & Tagline Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border"
                  style={{
                    backgroundColor: `${animal.colorTheme.primary}25`,
                    borderColor: `${animal.colorTheme.primary}80`,
                    color: animal.colorTheme.accent,
                  }}
                >
                  {category}
                </span>
                <span className="text-stone-400 text-xs font-medium">
                  {animal.subtitle}
                </span>
              </div>

              {/* Large Animal Illustration / Avatar */}
              <div className="relative my-2">
                <AnimalIllustration animal={animal} size={150} className="mx-auto" />
              </div>

              {/* Animal Name */}
              <h2
                id="result-animal-name"
                className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2 uppercase drop-shadow-md flex items-center justify-center gap-3"
              >
                <span>{animal.emoji}</span>
                <span>{matchName}</span>
              </h2>

              {/* Animated Percentage Score */}
              <div
                id="result-score-badge"
                className="inline-flex items-baseline gap-1 my-3 px-5 py-2 rounded-2xl border"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  borderColor: `${animal.colorTheme.primary}50`,
                }}
              >
                <span
                  className="text-4xl md:text-5xl font-black tracking-tight"
                  style={{ color: animal.colorTheme.accent }}
                >
                  {displayScore}%
                </span>
                <span className="text-base md:text-lg font-bold text-stone-300 tracking-wider">
                  MATCH
                </span>
              </div>

              {/* Playful Reason Quote */}
              <div className="relative my-4 px-6 py-4 rounded-2xl bg-stone-900/70 border border-stone-800/80 max-w-md w-full">
                <p className="text-stone-200 text-sm md:text-base leading-relaxed italic">
                  “{reason}”
                </p>

                {features && features.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-3 border-t border-stone-800/60">
                    {features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700/50"
                      >
                        ✨ {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Fun Animal Fact */}
              {animal.funFact && (
                <p className="text-xs text-stone-400 max-w-sm mb-4">
                  💡 <span className="text-stone-300 font-medium">Wild Fact:</span> {animal.funFact}
                </p>
              )}

              {/* Required Privacy/Humor Disclaimer */}
              <p
                id="result-disclaimer"
                className="text-xs text-stone-400 max-w-md border-t border-stone-800/60 pt-4 pb-2"
              >
                Just for fun — this is a playful visual match, not a scientific assessment.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-md mt-4">
                {/* Try Again Button */}
                <button
                  id="try-again-button"
                  onClick={onTryAgain}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-stone-200 bg-stone-800/90 hover:bg-stone-700/90 border border-stone-700 transition active:scale-95 font-semibold text-sm cursor-pointer shadow-lg"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>Try Again</span>
                </button>

                {/* Share Result Button */}
                <button
                  id="share-result-button"
                  onClick={handleShare}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-stone-950 font-bold text-sm transition active:scale-95 cursor-pointer shadow-lg hover:brightness-110"
                  style={{
                    backgroundColor: animal.colorTheme.primary,
                    boxShadow: `0 4px 20px ${animal.colorTheme.glow}`,
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-stone-950" />
                      <span>Copied Share Link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-stone-950" />
                      <span>Share Result 🐾</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary actions: Download snapshot */}
              <button
                id="download-card-button"
                onClick={handleDownloadCard}
                disabled={downloading}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-300 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloading ? 'Preparing card...' : 'Save result card (PNG)'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
