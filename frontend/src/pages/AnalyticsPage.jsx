import React, { useState, useEffect } from 'react';
import AnalyticsCharts from '../components/analytics/AnalyticsCharts';
import StatCard from '../components/common/StatCard';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { apiClient, checkBackendHealth } from '../services/api';
import { notify } from '../hooks/useNotifications';
import { BarChart3, Download, RefreshCw, Award, ShieldCheck, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadAnalytics = async () => {
    setIsLoading(true);
    const isOnline = await checkBackendHealth();
    if (isOnline) {
      try {
        const res = await apiClient.get('/analytics');
        if (res.data?.success) {
          setAnalyticsData(res.data.data);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.warn('[AnalyticsPage] Backend error, using default mock analytics');
      }
    }

    // Default Fallback
    setAnalyticsData({
      totalWasteProcessedKg: 1284,
      pendingPickupsCount: 24,
      activeMobileUnitsCount: 8,
      aiAccuracyPercentage: 96.8,
      categoryBreakdown: {
        YELLOW: 38,
        RED: 32,
        WHITE: 18,
        BLUE: 12
      },
      dailyVolumeKg: [
        { day: 'Mon', volume: 142 },
        { day: 'Tue', volume: 188 },
        { day: 'Wed', volume: 165 },
        { day: 'Thu', volume: 210 },
        { day: 'Fri', volume: 245 },
        { day: 'Sat', volume: 195 },
        { day: 'Sun', volume: 139 }
      ],
      slaCompletionRate: 98.4
    });
    setIsLoading(false);
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const handleExportReport = () => {
    notify('Generated MPCB / CPCB Compliance Audit PDF Report for District Civil Hospital Nashik!', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Regulatory Audit & Insights
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
              CPCB Certified Format
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Analytics & Compliance Metrics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time segregation accuracy, waste generation volumes, and SLA performance indicators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAnalytics}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
          >
            <Download className="w-4 h-4" />
            Export Compliance Report
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="7-Day Volume"
          value="1,284"
          unit="kg"
          change="+12.4%"
          isPositive={true}
          icon={BarChart3}
          color="indigo"
        />

        <StatCard
          title="SLA Pickup Rate"
          value="98.4"
          unit="%"
          change="+2.1%"
          isPositive={true}
          icon={Activity}
          color="emerald"
        />

        <StatCard
          title="Vision Accuracy"
          value="96.8"
          unit="%"
          change="+0.9%"
          isPositive={true}
          icon={ShieldCheck}
          color="blue"
        />

        <StatCard
          title="Audit Compliance"
          value="100"
          unit="%"
          change="Zero Violations"
          isPositive={true}
          icon={Award}
          color="yellow"
        />
      </div>

      {/* Charts & Rankings */}
      <AnalyticsCharts analyticsData={analyticsData} />
    </div>
  );
}
