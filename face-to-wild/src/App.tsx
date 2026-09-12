import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CameraView } from './components/CameraView';
import { LoadingScanner } from './components/LoadingScanner';
import { ResultModal } from './components/ResultModal';
import { PrivacyModal } from './components/PrivacyModal';
import { getAnimalProfile } from './data/animals';
import { SavedResult, AppState } from './types';
import { AlertTriangle, Sparkles, Shield, Info, History } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>('camera');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<SavedResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [history, setHistory] = useState<SavedResult[]>([]);

  // Check backend configuration on mount
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.hasApiKey === false) {
          console.warn('GEMINI_API_KEY is not detected in backend environment.');
        }
      })
      .catch((err) => {
        console.warn('Backend check failed:', err);
      });
  }, []);

  // Handle image capture and call Gemini API
  const handleCapture = async (base64Image: string) => {
    setCapturedImage(base64Image);
    setAppState('loading');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Human-friendly error from backend
        const friendlyMsg =
          data.message ||
          'Could not complete analysis. Please ensure your face is well-lit and centered, then try again.';
        setErrorMessage(friendlyMsg);
        setAppState('camera');
        return;
      }

      // Successful match
      const animalProfile = getAnimalProfile(data.match, data.category);
      const newResult: SavedResult = {
        match: data.match,
        category: data.category || animalProfile.category,
        score: data.score,
        reason: data.reason,
        features: data.features || animalProfile.traits,
        timestamp: Date.now(),
        animal: animalProfile,
        capturedImage: base64Image,
      };

      setCurrentResult(newResult);
      setHistory((prev) => [newResult, ...prev.slice(0, 8)]);
      setAppState('result');
    } catch (err) {
      console.error('API call failed:', err);
      setErrorMessage(
        'Connection error while reaching the wildlife matching service. Please check your network connection and try again.'
      );
      setAppState('camera');
    }
  };

  const handleTryAgain = () => {
    setAppState('camera');
    setCapturedImage(null);
    setCurrentResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-jungle-glow flex flex-col justify-between selection:bg-emerald-500 selection:text-stone-950">
      {/* Background ambient foliage blur elements */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Top Header */}
      <Header onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Main Interactive Stage */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 w-full max-w-5xl mx-auto z-10">
        {/* Error notification banner if any */}
        {errorMessage && appState === 'camera' && (
          <div
            id="error-banner"
            className="w-full max-w-xl mb-4 p-4 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-amber-200 flex items-start gap-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2"
          >
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{errorMessage}</p>
              <p className="text-xs text-amber-300/80 mt-1">
                Tip: Good, even lighting and facing directly towards the camera produces the best matches.
              </p>
            </div>
          </div>
        )}

        {/* View Switcher */}
        {appState === 'camera' && (
          <CameraView onCapture={handleCapture} isProcessing={false} />
        )}

        {appState === 'loading' && (
          <LoadingScanner capturedImage={capturedImage} />
        )}

        {appState === 'result' && currentResult && (
          <ResultModal
            matchName={currentResult.match}
            category={currentResult.category}
            score={currentResult.score}
            reason={currentResult.reason}
            features={currentResult.features}
            animal={currentResult.animal}
            capturedImage={capturedImage}
            onTryAgain={handleTryAgain}
          />
        )}

        {/* Session Match History Strip (when 2+ matches in current session) */}
        {history.length > 1 && appState === 'camera' && (
          <div
            id="session-history-section"
            className="w-full max-w-xl mt-8 pt-6 border-t border-stone-800/80"
          >
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-stone-400">
              <History className="w-3.5 h-3.5 text-emerald-400" />
              <span>PREVIOUS DISCOVERIES THIS SESSION</span>
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {history.map((item, idx) => (
                <button
                  key={`${item.timestamp}-${idx}`}
                  onClick={() => {
                    setCurrentResult(item);
                    setAppState('result');
                  }}
                  className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-emerald-500/50 transition active:scale-95 cursor-pointer text-xs"
                >
                  <span className="text-base">{item.animal.emoji}</span>
                  <span className="font-semibold text-stone-200">{item.match}</span>
                  <span className="text-emerald-400 font-bold">{item.score}%</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Standard App Footer & Mandatory Disclaimer */}
      <footer className="relative w-full z-20 py-4 px-6 border-t border-stone-800/60 bg-stone-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-stone-400">
          <p id="app-footer-disclaimer">
            Just for fun — this is a playful visual match, not a scientific assessment.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-stone-400 hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacy & Safety</span>
            </button>
            <span className="text-stone-700">•</span>
            <span className="text-stone-400">Powered by Gemini AI</span>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
