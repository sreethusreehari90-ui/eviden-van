import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Camera,
  RefreshCw,
  AlertCircle,
  Upload,
  SwitchCamera,
  VideoOff,
  Sparkles,
  Info,
} from 'lucide-react';

interface CameraViewProps {
  onCapture: (base64Image: string) => void;
  isProcessing: boolean;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture, isProcessing }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);
  // Default camera to turned off as requested
  const [isCameraTurnedOff, setIsCameraTurnedOff] = useState<boolean>(true);

  // Stop current active camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Explicit user action to turn off camera
  const handleTurnOffCamera = () => {
    stopCamera();
    setIsCameraTurnedOff(true);
  };

  // Explicit user action to turn on camera
  const handleTurnOnCamera = () => {
    setIsCameraTurnedOff(false);
    startCamera();
  };

  // Enumerate video input devices
  const updateDeviceList = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = allDevices.filter((d) => d.kind === 'videoinput');
      setDevices(videoInputs);
    } catch (e) {
      console.warn('Could not enumerate devices:', e);
    }
  }, []);

  // Start camera with chosen constraints
  const startCamera = useCallback(async () => {
    stopCamera();
    setErrorMessage(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setHasPermission(false);
      setErrorMessage(
        'Camera API is not supported in this browser. You can still test by uploading a photo.'
      );
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        audio: false,
        video: selectedDeviceId
          ? { deviceId: { exact: selectedDeviceId } }
          : {
              facingMode: facingMode,
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }

      setHasPermission(true);
      setIsCameraActive(true);
      updateDeviceList();
    } catch (err: unknown) {
      const error = err as Error;
      setHasPermission(false);
      setIsCameraActive(false);

      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setErrorMessage(
          'Camera permission was denied. Please allow camera access in your browser address bar/settings, then click "Retry Camera".'
        );
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setErrorMessage(
          'No camera device was found. You can upload a photo below to find your wild match.'
        );
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setErrorMessage(
          'Camera is currently in use by another application or tab. Please close other camera apps and retry.'
        );
      } else {
        setErrorMessage(
          `Unable to access camera (${error.message || 'unknown error'}). You can upload a photo to proceed.`
        );
      }
    }
  }, [facingMode, selectedDeviceId, stopCamera, updateDeviceList]);

  // Initial startup: keep camera off by default as requested
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Toggle between front and back camera (especially on mobile)
  const toggleFacingMode = () => {
    if (devices.length > 1 && selectedDeviceId) {
      // Switch device ID
      const currentIndex = devices.findIndex((d) => d.deviceId === selectedDeviceId);
      const nextIndex = (currentIndex + 1) % devices.length;
      setSelectedDeviceId(devices[nextIndex].deviceId);
    } else {
      setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
      setSelectedDeviceId(null);
    }
  };

  // Capture frame from the live video element
  const captureFrame = () => {
    if (!videoRef.current || !isCameraActive) return;

    // Flash visual shutter effect
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 200);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');

    // Constrain resolution to 720px max dimension for fast transmission and Gemini analysis
    const maxDimension = 720;
    let width = video.videoWidth || 640;
    let height = video.videoHeight || 480;

    if (width > maxDimension || height > maxDimension) {
      if (width > height) {
        height = Math.round((height * maxDimension) / width);
        width = maxDimension;
      } else {
        width = Math.round((width * maxDimension) / height);
        height = maxDimension;
      }
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Mirror horizontal if using front camera for natural selfie orientation
    if (facingMode === 'user' && !selectedDeviceId) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);
    const base64Data = canvas.toDataURL('image/jpeg', 0.85);

    onCapture(base64Data);
  };

  // Handle manual photo upload as accessible fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 720;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL('image/jpeg', 0.85);
          onCapture(base64);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-xl mx-auto px-4">
      {/* Camera Viewport Container */}
      <div
        id="camera-viewport-container"
        className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[4/3] max-h-[560px] rounded-3xl overflow-hidden bg-stone-950 border-2 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex items-center justify-center"
      >
        {/* Shutter flash animation */}
        {flashEffect && (
          <div className="absolute inset-0 bg-white z-30 transition-opacity duration-200 pointer-events-none opacity-80" />
        )}

        {/* Live Video Feed */}
        <video
          ref={videoRef}
          id="camera-video-feed"
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-transform duration-300 ${
            facingMode === 'user' && !selectedDeviceId ? 'scale-x-[-1]' : ''
          }`}
        />

        {/* Camera Turned Off Screen */}
        {isCameraTurnedOff && (
          <div
            id="camera-turned-off-card"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-stone-950/95 backdrop-blur-md"
          >
            <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-700/80 flex items-center justify-center mb-4 text-stone-400 shadow-inner">
              <VideoOff className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Camera is Turned Off</h3>
            <p className="text-sm text-stone-400 max-w-sm mb-6 leading-relaxed">
              Your webcam is currently disabled and video streaming is paused. Turn it on when you&apos;re ready to find your wild match, or upload a photo.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <button
                id="camera-turn-on-button"
                onClick={handleTurnOnCamera}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm transition active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                <Camera className="w-4 h-4 text-stone-950" />
                <span>Turn On Camera</span>
              </button>

              <button
                id="camera-upload-off-button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm border border-stone-700 transition active:scale-95 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Upload Photo</span>
              </button>
            </div>
          </div>
        )}

        {/* Camera Inactive / Error Overlay (when camera was attempted but failed) */}
        {!isCameraTurnedOff && !isCameraActive && (
          <div
            id="camera-fallback-card"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-stone-950/95 backdrop-blur-md"
          >
            <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center mb-4 text-red-400">
              <VideoOff className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Camera Unavailable</h3>
            <p className="text-sm text-stone-400 max-w-sm mb-6 leading-relaxed">
              {errorMessage || 'Camera access is needed to match your face with the animal kingdom.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <button
                id="camera-retry-button"
                onClick={startCamera}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-sm transition active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Camera</span>
              </button>

              <button
                id="camera-upload-fallback-button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm border border-stone-700 transition active:scale-95 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Upload Photo</span>
              </button>
            </div>
          </div>
        )}

        {/* Live Camera Active Overlays */}
        {isCameraActive && !isCameraTurnedOff && (
          <>
            {/* Ambient Dark Jungle Vignette */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

            {/* Circular/Rounded Face Guide Overlay */}
            <div
              id="face-guide-overlay"
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6"
            >
              {/* Rounded Oval Face Reticle */}
              <div className="relative w-52 h-64 sm:w-60 sm:h-72 md:w-64 md:h-80 rounded-[48%] border-2 border-dashed border-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center animate-pulse">
                {/* Crosshairs & guides */}
                <div className="absolute top-0 w-4 h-0.5 bg-emerald-400/80 -translate-y-1" />
                <div className="absolute bottom-0 w-4 h-0.5 bg-emerald-400/80 translate-y-1" />
                <div className="absolute left-0 w-0.5 h-4 bg-emerald-400/80 -translate-x-1" />
                <div className="absolute right-0 w-0.5 h-4 bg-emerald-400/80 translate-x-1" />
              </div>

              {/* Guide Instruction Pill */}
              <div className="mt-4 px-3.5 py-1.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-medium tracking-wide shadow-lg">
                Position your face inside the guide
              </div>
            </div>

            {/* Top Control Bar: Status & Action Buttons */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/70 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE FEED</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Turn Off Camera Button */}
                <button
                  id="camera-turn-off-button"
                  onClick={handleTurnOffCamera}
                  title="Turn off camera"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-red-500/40 hover:bg-red-950/60 text-red-300 hover:text-red-200 text-xs font-semibold transition active:scale-95 cursor-pointer shadow-lg"
                >
                  <VideoOff className="w-3.5 h-3.5 text-red-400" />
                  <span>Turn Off</span>
                </button>

                {/* Camera Flip / Switcher */}
                <button
                  id="camera-switch-button"
                  onClick={toggleFacingMode}
                  title="Switch front/rear camera"
                  className="p-2.5 rounded-full bg-stone-950/70 backdrop-blur-md border border-stone-700 hover:border-emerald-400 text-stone-200 hover:text-emerald-300 transition active:scale-95 cursor-pointer shadow-lg"
                >
                  <SwitchCamera className="w-4 h-4" />
                </button>

                {/* Upload Photo button */}
                <button
                  id="camera-upload-button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Or upload an existing photo"
                  className="p-2.5 rounded-full bg-stone-950/70 backdrop-blur-md border border-stone-700 hover:border-emerald-400 text-stone-200 hover:text-emerald-300 transition active:scale-95 cursor-pointer shadow-lg"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Action Controls */}
      <div className="w-full max-w-sm mt-6 flex flex-col items-center">
        {isCameraTurnedOff ? (
          <div className="w-full flex flex-col gap-2.5">
            <button
              id="find-my-match-turn-on-button"
              onClick={handleTurnOnCamera}
              className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg tracking-wide shadow-2xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-stone-950 hover:brightness-110 active:scale-95 shadow-emerald-500/25 border border-emerald-300/40"
            >
              <Camera className="w-5 h-5 text-stone-950" />
              <span>Turn On Camera to Match 🐾</span>
            </button>

            <button
              id="upload-photo-instead-button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-sm font-semibold transition active:scale-95 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Or Upload Photo from Device</span>
            </button>
          </div>
        ) : (
          <>
            <button
              id="find-my-match-button"
              onClick={captureFrame}
              disabled={!isCameraActive || isProcessing}
              className={`w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg tracking-wide shadow-2xl transition-all duration-300 cursor-pointer ${
                isCameraActive && !isProcessing
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-stone-950 hover:brightness-110 active:scale-95 shadow-emerald-500/25 border border-emerald-300/40'
                  : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
              }`}
            >
              {/* Glowing pulse ring */}
              {isCameraActive && !isProcessing && (
                <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-30 blur-sm group-hover:opacity-60 transition duration-300" />
              )}

              <span className="relative flex items-center gap-2">
                <Camera className="w-5 h-5 text-stone-950" />
                <span>Find My Match 🐾</span>
              </span>
            </button>

            {/* Quick Turn Off Camera link */}
            <button
              id="camera-turn-off-subtle-button"
              onClick={handleTurnOffCamera}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-400 transition cursor-pointer"
            >
              <VideoOff className="w-3.5 h-3.5" />
              <span>Turn off camera</span>
            </button>
          </>
        )}

        {/* Helper Note */}
        <p className="text-xs text-stone-400 text-center mt-3 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Frames are processed securely in memory and never stored permanently.</span>
        </p>
      </div>
    </div>
  );
};
