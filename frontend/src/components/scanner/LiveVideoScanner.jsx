import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Video, VideoOff, Camera, Zap, RefreshCw, AlertCircle } from 'lucide-react';

/**
 * LiveVideoScanner — Real-time webcam feed with single-frame AI capture.
 * Uses browser MediaDevices API. Falls back gracefully if camera is unavailable.
 */
export default function LiveVideoScanner({ onFrameCaptured, isAnalyzing }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraState, setCameraState] = useState('idle'); // idle | starting | active | error | captured
  const [errorMsg, setErrorMsg] = useState('');
  const [capturedFrame, setCapturedFrame] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // front / back camera

  // Start webcam stream
  const startCamera = useCallback(async () => {
    setCameraState('starting');
    setErrorMsg('');
    setCapturedFrame(null);

    try {
      const constraints = {
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraState('active');
      }
    } catch (err) {
      console.error('[LiveVideoScanner] Camera error:', err);
      let msg = 'Camera access denied.';
      if (err.name === 'NotFoundError') msg = 'No camera found on this device.';
      else if (err.name === 'NotAllowedError') msg = 'Camera permission denied. Please allow camera access in browser settings.';
      else if (err.name === 'NotReadableError') msg = 'Camera is already in use by another application.';
      setErrorMsg(msg);
      setCameraState('error');
    }
  }, [facingMode]);

  // Stop stream and release camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraState('idle');
  }, []);

  // Capture a single frame from the live video feed
  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || cameraState !== 'active') return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob and pass to parent for AI classification
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const previewUrl = canvas.toDataURL('image/jpeg', 0.92);
        setCapturedFrame(previewUrl);
        setCameraState('captured');
        stopCamera();

        // Build a File object so it matches the existing classifyWasteImage API
        const file = new File([blob], `webcam-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        onFrameCaptured({ file, previewUrl, labelHint: 'webcam-capture' });
      },
      'image/jpeg',
      0.92
    );
  }, [cameraState, stopCamera, onFrameCaptured]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Restart with flipped camera
  const flipCamera = () => {
    stopCamera();
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  useEffect(() => {
    if (facingMode && cameraState === 'idle') {
      // no auto-start on flip — wait for user
    }
  }, [facingMode]);

  // Reset and try again
  const reset = () => {
    setCapturedFrame(null);
    setCameraState('idle');
    setErrorMsg('');
  };

  return (
    <div className="space-y-4">
      {/* Camera Viewport */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-xl"
           style={{ aspectRatio: '16/9', minHeight: '240px' }}>

        {/* Live Video Feed */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            cameraState === 'active' ? 'opacity-100' : 'opacity-0 absolute'
          }`}
          playsInline
          muted
          autoPlay
        />

        {/* Captured Frame Preview */}
        {capturedFrame && (
          <img
            src={capturedFrame}
            alt="Captured frame"
            className="w-full h-full object-cover"
          />
        )}

        {/* Hidden canvas for frame capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Overlay States */}
        {cameraState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/90">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Video className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-white">Live Camera Scan</p>
              <p className="text-xs text-slate-400 mt-1">Point camera at medical waste for instant AI classification</p>
            </div>
            <button
              onClick={startCamera}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
            >
              <Video className="w-4 h-4" />
              Start Camera
            </button>
          </div>
        )}

        {cameraState === 'starting' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/90">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Initializing Camera...</p>
          </div>
        )}

        {cameraState === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/90 p-6">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-red-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-red-300">Camera Error</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">{errorMsg}</p>
            </div>
            <button
              onClick={startCamera}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Try Again
            </button>
          </div>
        )}

        {/* Scanning overlay while analyzing captured frame */}
        {cameraState === 'captured' && isAnalyzing && (
          <div className="absolute inset-0 bg-indigo-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent absolute animate-scan shadow-glow-indigo" />
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Analyzing Bio-Medical Features...
            </span>
          </div>
        )}

        {/* Live indicator */}
        {cameraState === 'active' && (
          <>
            {/* Live badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </div>

            {/* AI viewfinder corners */}
            <div className="absolute inset-8 pointer-events-none">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-indigo-400 rounded-tl-sm" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-indigo-400 rounded-tr-sm" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-indigo-400 rounded-bl-sm" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-indigo-400 rounded-br-sm" />
            </div>

            {/* Scanning line animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent animate-scan" />
            </div>
          </>
        )}
      </div>

      {/* Camera Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {cameraState === 'active' && (
          <>
            {/* Capture Button — Main CTA */}
            <button
              onClick={captureFrame}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
            >
              <Camera className="w-4 h-4" />
              Capture & Classify
            </button>

            {/* Flip Camera */}
            <button
              onClick={flipCamera}
              title="Flip Camera"
              className="p-3 rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Stop Camera */}
            <button
              onClick={stopCamera}
              title="Stop Camera"
              className="p-3 rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 border border-red-800/50 border transition-all"
            >
              <VideoOff className="w-4 h-4 text-red-400" />
            </button>
          </>
        )}

        {(cameraState === 'captured' || cameraState === 'error') && !isAnalyzing && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Scan Another
          </button>
        )}

        {/* Info tip */}
        {cameraState === 'active' && (
          <p className="w-full text-center text-[11px] text-slate-500">
            <Zap className="inline w-3 h-3 mr-0.5 text-amber-400" />
            Hold item in frame → Click "Capture & Classify"
          </p>
        )}
      </div>
    </div>
  );
}
