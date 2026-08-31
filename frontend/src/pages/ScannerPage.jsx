import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DragDropZone from '../components/scanner/DragDropZone';
import LiveVideoScanner from '../components/scanner/LiveVideoScanner';
import ClassificationResult from '../components/scanner/ClassificationResult';
import SegregationGuideModal from '../components/bins/SegregationGuideModal';
import NewPickupModal from '../components/pickups/NewPickupModal';
import { classifyWasteImage } from '../services/wasteService';
import { updateBinLoad } from '../services/binService';
import { createPickup } from '../services/pickupService';
import { appendTraceabilityEvent } from '../services/traceabilityService';
import { notify } from '../hooks/useNotifications';
import { ScanLine, BookOpen, Sparkles, Video, ImageUp, ChevronRight } from 'lucide-react';

const SCAN_MODES = [
  { id: 'upload', label: 'Upload / Drag-Drop', icon: ImageUp, desc: 'Upload a photo or use quick samples' },
  { id: 'video',  label: 'Live Video Scan',   icon: Video,    desc: 'Use device camera for real-time capture' }
];

export default function ScannerPage() {
  const [activeMode, setActiveMode] = useState('upload');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [isAddingToBin, setIsAddingToBin] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isNewPickupOpen, setIsNewPickupOpen] = useState(false);
  const navigate = useNavigate();

  const handleImageSelected = async ({ file, previewUrl, labelHint, mockItem }) => {
    setIsScanning(true);
    setResult(null);

    try {
      let classification;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('facility', 'District Civil Hospital Nashik - Ward 4B');
        classification = await classifyWasteImage(formData);
      } else {
        classification = await classifyWasteImage({
          label: labelHint,
          labelHint: labelHint,
          facility: 'District Civil Hospital Nashik - Ward 4B'
        });
      }

      setResult(classification);
      notify(`AI Classified: ${classification.label} (${classification.category} Category)`, 'success');
    } catch (error) {
      notify('Classification failed. Please try again.', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  const handleAddToSmartBin = async () => {
    if (!result) return;
    setIsAddingToBin(true);

    try {
      const addedWeight = 0.45;
      await updateBinLoad(result.category, addedWeight);

      await appendTraceabilityEvent({
        wasteId: result.wasteId,
        action: 'BIN_ASSIGNED',
        title: `Waste Allocated to ${result.category} Smart Bin`,
        actor: 'Clinical Staff (Smart Bin Controller)',
        location: 'District Civil Hospital Nashik - Ward 4B',
        meta: {
          category: result.category,
          confidence: result.confidence,
          weightKg: addedWeight
        }
      });

      notify(`Allocated to ${result.category} container. Virtual telemetry updated!`, 'success');
    } catch (e) {
      notify('Failed to update smart bin.', 'error');
    } finally {
      setIsAddingToBin(false);
    }
  };

  const handleCreatePickupSubmit = async (payload) => {
    const newJob = await createPickup(payload);
    notify(`Created On-Demand Pickup: ${newJob.pickupId}`, 'success');
    navigate('/pickups');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Point-of-Care Edge Vision
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/30">
              BMW Rules 2016
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            AI Waste Scanner
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload an image or use live video to classify biomedical waste and assign color-coded BMW bins.
          </p>
        </div>

        <button
          onClick={() => setIsGuideOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Segregation Guide
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900/80 border border-slate-800 w-full sm:w-fit">
        {SCAN_MODES.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => {
                setActiveMode(mode.id);
                setResult(null);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-none justify-center ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-glow-indigo'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {mode.label}
              {mode.id === 'video' && !isActive && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-black border border-amber-500/30 ml-1">
                  NEW
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mode Description Bar */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          {SCAN_MODES.find(m => m.id === activeMode)?.desc} — AI engine classifies instantly into Yellow / Red / White / Blue BMW category.
        </span>
      </div>

      {/* Scanner Interface */}
      <div className="rounded-3xl border border-slate-800 bg-[#0d1322]/80 backdrop-blur-2xl p-5 sm:p-7">
        {activeMode === 'upload' ? (
          <DragDropZone onImageSelected={handleImageSelected} isScanning={isScanning} />
        ) : (
          <LiveVideoScanner onFrameCaptured={handleImageSelected} isAnalyzing={isScanning} />
        )}
      </div>

      {/* Classification Result Card */}
      {result && (
        <ClassificationResult
          result={result}
          onAddToBin={handleAddToSmartBin}
          onCreatePickup={() => setIsNewPickupOpen(true)}
          isAdding={isAddingToBin}
        />
      )}

      {/* Segregation Guide Modal */}
      <SegregationGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* New Pickup Modal */}
      <NewPickupModal
        isOpen={isNewPickupOpen}
        onClose={() => setIsNewPickupOpen(false)}
        onSubmit={handleCreatePickupSubmit}
        initialCategory={result?.category || 'YELLOW'}
      />
    </div>
  );
}
