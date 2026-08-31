import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingLayout from './layouts/LandingLayout';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ScannerPage from './pages/ScannerPage';
import SmartBinsPage from './pages/SmartBinsPage';
import PickupsPage from './pages/PickupsPage';
import LiveMapPage from './pages/LiveMapPage';
import TraceabilityPage from './pages/TraceabilityPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Authenticated Dashboard / Operations Suite */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/bins" element={<SmartBinsPage />} />
        <Route path="/pickups" element={<PickupsPage />} />
        <Route path="/map" element={<LiveMapPage />} />
        <Route path="/traceability" element={<TraceabilityPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>

      {/* 404 Catch-All Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
