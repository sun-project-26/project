import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { updateBinLoad } from '../services/binService';
import { createPickup, updatePickupStatus } from '../services/pickupService';
import { appendTraceabilityEvent } from '../services/traceabilityService';
import { notify } from './useNotifications';

export const DEMO_STEPS = [
  {
    step: 1,
    title: '1. Biomedical Waste Image Upload',
    description: 'A nurse at District Civil Hospital Nashik captures an image of discarded sharps (used syringe).',
    targetRoute: '/scanner',
    actionLabel: 'Scan Sample Waste'
  },
  {
    step: 2,
    title: '2. AI Neural Classification',
    description: 'MediSort Vision Model analyzes the image, assigning Category WHITE with 96.8% confidence.',
    targetRoute: '/scanner',
    actionLabel: 'Review AI Result'
  },
  {
    step: 3,
    title: '3. Smart Bin Auto-Allocation',
    description: 'The item is allocated to the White Puncture-Proof Container (Ward 4B). Virtual telemetry increments bin load.',
    targetRoute: '/bins',
    actionLabel: 'Inspect Smart Bins'
  },
  {
    step: 4,
    title: '4. Automated Pickup Dispatch',
    description: 'Threshold alert triggers automated collection request PCK-8921 (Priority: Critical) for Trimbak Naka bay.',
    targetRoute: '/pickups',
    actionLabel: 'View Pickups'
  },
  {
    step: 5,
    title: '5. Nearest Mobile Unit Assignment',
    description: 'Fleet Dispatcher assigns Mobile Unit MS-01 (MH-15-BW-104, Driver: Vikram Patil) based on GPS proximity.',
    targetRoute: '/map',
    actionLabel: 'Assign & Track Fleet'
  },
  {
    step: 6,
    title: '6. Real-Time GPS Route Navigation',
    description: 'Mobile Unit MS-01 navigates through Nashik medical corridor with live ETA telematics.',
    targetRoute: '/map',
    actionLabel: 'Observe Transit'
  },
  {
    step: 7,
    title: '7. Waste Handover & Collection',
    description: 'Driver verifies barcode, weighs payload (24.5 kg), and completes digital pickup at District Civil Hospital.',
    targetRoute: '/pickups',
    actionLabel: 'Complete Pickup'
  },
  {
    step: 8,
    title: '8. Tamper-Evident SHA-256 Ledger',
    description: 'Cryptographic proof-of-custody sealed from generation in Ward 4B to CBWTF Ambad Bio-Medical Treatment Plant.',
    targetRoute: '/traceability',
    actionLabel: 'Inspect Custody Chain'
  }
];

export function useDemoMode(navigate) {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunningAuto, setIsRunningAuto] = useState(false);
  const [demoWasteId, setDemoWasteId] = useState('WST-2026-DEMO-01');

  const startDemo = useCallback(() => {
    setIsDemoActive(true);
    setCurrentStepIndex(0);
    navigate('/scanner');
    notify('🚀 Live Demo Mode Activated!', 'success');
  }, [navigate]);

  const stopDemo = useCallback(() => {
    setIsDemoActive(false);
    setIsRunningAuto(false);
    setCurrentStepIndex(0);
    notify('Demo Mode Ended.', 'info');
  }, []);

  const executeCurrentStep = useCallback(async (stepIndexToRun) => {
    const idx = stepIndexToRun !== undefined ? stepIndexToRun : currentStepIndex;
    const currentStep = DEMO_STEPS[idx];
    if (!currentStep) return;

    navigate(currentStep.targetRoute);

    switch (idx) {
      case 0: // Step 1: Upload Waste
        notify('Step 1: Point-of-Care image captured at District Civil Hospital Nashik.', 'info');
        break;

      case 1: // Step 2: AI Classification
        notify('Step 2: AI classified item as WHITE Category (96.8% confidence)', 'success');
        break;

      case 2: // Step 3: Smart Bin Allocation
        await updateBinLoad('WHITE', 0.45);
        notify('Step 3: Allocated to White Puncture-Proof Container (Ward 4B). Telemetry updated.', 'info');
        break;

      case 3: // Step 4: Create Pickup
        await createPickup({
          pickupId: 'PCK-DEMO-99',
          facility: 'District Civil Hospital Nashik - Ward 4B',
          wasteCategory: 'WHITE',
          weight: 12.5,
          priority: 'Critical',
          pickupNotes: 'Automated critical sharps overflow pickup at Trimbak Naka gate'
        });
        notify('Step 4: Critical Pickup request created automatically.', 'warning');
        break;

      case 4: // Step 5: Assign Unit
        await updatePickupStatus('PCK-DEMO-99', 'En Route', 'MS-01 (MH-15-BW-104)');
        notify('Step 5: Unit MS-01 (Vikram Patil) dispatched to District Civil Hospital.', 'success');
        break;

      case 5: // Step 6: Map Navigation
        notify('Step 6: Unit MS-01 in transit on Trimbakeshwar Road (Speed: 34 km/h, ETA: 4 mins)', 'info');
        break;

      case 6: // Step 7: Complete Pickup
        await updatePickupStatus('PCK-DEMO-99', 'Completed', 'MS-01 (MH-15-BW-104)');
        notify('Step 7: Pickup collected and verified at District Civil Hospital loading dock.', 'success');
        break;

      case 7: // Step 8: Traceability Ledger
        await appendTraceabilityEvent({
          wasteId: demoWasteId,
          action: 'DEMO_DISPOSAL_COMPLETE',
          title: 'Central Autoclave Disposal Certified',
          actor: 'CBWTF Operator: Arvind Koli',
          location: 'CBWTF Ambad Bio-Medical Treatment Plant, Nashik',
          meta: { status: 'Verified & Autoclaved / Encapsulated', certificate: 'MPCB-NASHIK-BMW-9941' }
        });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        notify('🎉 Step 8: Cryptographic SHA-256 Ledger Sealed! Demo Complete!', 'success');
        break;

      default:
        break;
    }
  }, [currentStepIndex, navigate, demoWasteId]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      executeCurrentStep(nextIdx);
    } else {
      stopDemo();
    }
  }, [currentStepIndex, executeCurrentStep, stopDemo]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      navigate(DEMO_STEPS[prevIdx].targetRoute);
    }
  }, [currentStepIndex, navigate]);

  const runFullAutoDemo = useCallback(async () => {
    setIsRunningAuto(true);
    setIsDemoActive(true);
    setCurrentStepIndex(0);

    for (let i = 0; i < DEMO_STEPS.length; i++) {
      setCurrentStepIndex(i);
      await executeCurrentStep(i);
      await new Promise((r) => setTimeout(r, 2800));
    }

    setIsRunningAuto(false);
  }, [executeCurrentStep]);

  return {
    isDemoActive,
    currentStepIndex,
    currentStep: DEMO_STEPS[currentStepIndex],
    isRunningAuto,
    startDemo,
    stopDemo,
    nextStep,
    prevStep,
    runFullAutoDemo
  };
}
