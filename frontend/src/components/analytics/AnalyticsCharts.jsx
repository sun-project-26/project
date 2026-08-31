import React from 'react';
import GlassCard from '../common/GlassCard';
import Badge from '../common/Badge';
import { formatWeight, formatPercentage } from '../../utils/formatters';
import { BarChart3, PieChart, TrendingUp, CheckCircle, Award } from 'lucide-react';

export default function AnalyticsCharts({ analyticsData }) {
  const data = analyticsData || {
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
  };

  const maxVolume = Math.max(...data.dailyVolumeKg.map((d) => d.volume));

  const facilityRankings = [
    { name: 'District Civil Hospital Nashik - Apex Hub', compliance: '99.2%', volumeKg: '482 kg', grade: 'A+' },
    { name: 'Wockhardt Hospital Nashik - Wadala Naka', compliance: '98.4%', volumeKg: '340 kg', grade: 'A+' },
    { name: 'Sahyadri Super Speciality - Indira Nagar', compliance: '97.8%', volumeKg: '290 kg', grade: 'A' },
    { name: 'Ashoka Medicover Hospitals - Ashoka Marg', compliance: '96.6%', volumeKg: '315 kg', grade: 'A' },
    { name: 'HCG Manavata Cancer Centre - Mumbai Naka', compliance: '98.9%', volumeKg: '210 kg', grade: 'A+' },
    { name: 'Apollo Hospitals Nashik - Panchavati', compliance: '95.1%', volumeKg: '185 kg', grade: 'A' }
  ];

  return (
    <div className="space-y-6">
      {/* 2-Column Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Daily Waste Collection Volume */}
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Daily Waste Collection Volume</h4>
                <p className="text-xs text-slate-400">Kilograms processed over the past 7 days</p>
              </div>
            </div>
            <Badge label="7-Day SLA Trend" variant="primary" />
          </div>

          {/* Bar Chart Visual */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {data.dailyVolumeKg.map((item) => {
              const heightPercent = Math.round((item.volume / maxVolume) * 100);
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.volume}kg
                  </span>
                  <div className="w-full bg-slate-800/80 rounded-t-xl h-44 flex items-end p-1">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-glow-indigo transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{item.day}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Chart 2: BMW Category Breakdown */}
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <PieChart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Bio-Medical Waste by Category</h4>
                <p className="text-xs text-slate-400">Percentage distribution across 4 BMW categories</p>
              </div>
            </div>
            <Badge label="BMW Rules 2016" variant="default" />
          </div>

          {/* Progress Breakdown Bars */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-yellow-400">YELLOW: Anatomical & Infectious</span>
                <span className="text-white">{data.categoryBreakdown.YELLOW}%</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                  style={{ width: `${data.categoryBreakdown.YELLOW}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-red-400">RED: Contaminated Recyclable Plastics</span>
                <span className="text-white">{data.categoryBreakdown.RED}%</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full"
                  style={{ width: `${data.categoryBreakdown.RED}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-100">WHITE: Puncture-Proof Sharps</span>
                <span className="text-white">{data.categoryBreakdown.WHITE}%</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-200 to-slate-400 rounded-full"
                  style={{ width: `${data.categoryBreakdown.WHITE}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-blue-400">BLUE: Glassware & Implants</span>
                <span className="text-white">{data.categoryBreakdown.BLUE}%</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full"
                  style={{ width: `${data.categoryBreakdown.BLUE}%` }}
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Facility Performance Ranking Table */}
      <GlassCard>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Facility Segregation & Audit Performance</h4>
              <p className="text-xs text-slate-400">Real-time compliance rating according to regulatory standards</p>
            </div>
          </div>
          <Badge label="Audit Ready" variant="success" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Healthcare Facility</th>
                <th className="py-3 px-4">Segregation Accuracy</th>
                <th className="py-3 px-4">Total Handled</th>
                <th className="py-3 px-4 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {facilityRankings.map((facility, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{facility.name}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">{facility.compliance}</td>
                  <td className="py-3.5 px-4 text-slate-300">{facility.volumeKg}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-lg font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {facility.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
