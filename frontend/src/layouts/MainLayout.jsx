import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import Toast from '../components/common/Toast';
import DemoModeBar from '../components/demo/DemoModeBar';
import InteractiveDemoModal from '../components/demo/InteractiveDemoModal';
import { useNotifications } from '../hooks/useNotifications';
import { useDemoMode } from '../hooks/useDemoMode';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toasts, removeToast } = useNotifications();

  const {
    isDemoActive,
    currentStepIndex,
    currentStep,
    isRunningAuto,
    startDemo,
    stopDemo,
    nextStep,
    prevStep,
    runFullAutoDemo
  } = useDemoMode(navigate);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          onStartDemo={() => setIsDemoModalOpen(true)}
          isDemoActive={isDemoActive}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24">
          <Outlet />
        </main>
      </div>

      {/* Global Toast Notifications */}
      <Toast toasts={toasts} onClose={removeToast} />

      {/* Demo Mode Controller */}
      <DemoModeBar
        isDemoActive={isDemoActive}
        currentStepIndex={currentStepIndex}
        currentStep={currentStep}
        isRunningAuto={isRunningAuto}
        onNext={nextStep}
        onPrev={prevStep}
        onRunAuto={runFullAutoDemo}
        onStop={stopDemo}
      />

      {/* Demo Initiation Modal */}
      <InteractiveDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onStartGuided={startDemo}
        onStartAuto={runFullAutoDemo}
      />
    </div>
  );
}
