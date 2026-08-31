import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAP_FACILITIES } from '../../data/mockData';

// Fix Leaflet default icon paths if needed
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom vehicle animated HTML marker
const createVehicleIcon = (unitId, status) => {
  const isMoving = status === 'En Route' || status === 'Returning';
  return L.divIcon({
    className: 'custom-vehicle-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
        ${isMoving ? '<div class="pulse-ring"></div>' : ''}
        <div style="
          width: 34px;
          height: 34px;
          background: #4f46e5;
          border: 2px solid #ffffff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 800;
          font-size: 10px;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.6);
        ">
          ${unitId}
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
};

// Custom hospital facility marker
const createHospitalIcon = (name, type) => {
  const isPlant = type === 'Treatment Facility';
  return L.divIcon({
    className: 'custom-hospital-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${isPlant ? '#10b981' : '#e11d48'};
        border: 2px solid #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
      ">
        ${isPlant ? '♻️' : '🏥'}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Route polyline for active transit — through real Nashik medical corridor
const ACTIVE_ROUTE = [
  [19.9972, 73.7801], // District Civil Hospital (Trimbak Naka)
  [19.9925, 73.7760], // Trimbakeshwar Road Junction
  [19.9882, 73.7685], // HCG Manavata Cancer Centre (Mumbai Naka)
  [19.9868, 73.7925], // Wockhardt Hospital (Wadala Naka)
  [19.9725, 73.8050], // Ashoka Medicover Hospital (Ashoka Marg)
  [19.9654, 73.7788], // Sahyadri Super Speciality (Indira Nagar)
  [19.9520, 73.7490], // Garware Point / Ambad MIDC
  [19.9380, 73.7420]  // CBWTF Bio-Medical Waste Plant (Ambad)
];

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function LeafletMap({ units = [], onSelectUnit, selectedUnit, focusCoords }) {
  const defaultCenter = [19.9800, 73.7800]; // Nashik Healthcare Cluster Center

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-[#090d16]">
      <MapContainer
        center={focusCoords || defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {focusCoords && <RecenterMap center={focusCoords} />}

        {/* Dark Mode CartoDB / OSM Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Simulated Route Polyline */}
        <Polyline
          positions={ACTIVE_ROUTE}
          pathOptions={{
            color: '#6366f1',
            weight: 4,
            dashArray: '8, 8',
            opacity: 0.85
          }}
        />

        {/* Hospital Hub Markers */}
        {MAP_FACILITIES.map((facility) => (
          <Marker
            key={facility.id}
            position={facility.coords}
            icon={createHospitalIcon(facility.name, facility.type)}
          >
            <Popup>
              <div className="p-1.5 text-slate-100 max-w-[220px]">
                <p className="font-bold text-sm text-indigo-300">{facility.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{facility.address}</p>
                <div className="mt-1.5 pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{facility.type}</span>
                  {facility.pendingKg > 0 && (
                    <span className="font-bold text-amber-400">
                      {facility.pendingKg} kg load
                    </span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Mobile Collection Units Markers */}
        {units.map((unit) => (
          <Marker
            key={unit.unitId}
            position={[unit.latitude, unit.longitude]}
            icon={createVehicleIcon(unit.unitId, unit.status)}
            eventHandlers={{
              click: () => onSelectUnit && onSelectUnit(unit)
            }}
          >
            <Popup>
              <div className="p-1.5 space-y-1 text-slate-100 min-w-[180px]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="font-extrabold text-sm text-indigo-400">{unit.unitId}</span>
                    <span className="text-[10px] text-slate-400 ml-1.5 font-mono">{unit.regNumber || 'MH-15-BW-104'}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                    {unit.status}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-300">Driver: {unit.driver}</p>
                <p className="text-xs text-slate-400">Target: {unit.facilityTarget}</p>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700/60">
                  <span className="text-slate-400">ETA: <strong className="text-white">{unit.eta}</strong></span>
                  <span className="text-emerald-400 font-semibold">{unit.speedKmH} km/h</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] p-3 rounded-2xl bg-[#090d16]/90 border border-slate-800 backdrop-blur-md text-[11px] space-y-1.5 shadow-xl hidden sm:block">
        <p className="font-bold text-slate-300 uppercase tracking-wider mb-1">Nashik Telematics Grid</p>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-indigo-600 border border-white"></span>
          <span className="text-slate-300">Mobile Fleet (MH-15 Units)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-600 border border-white"></span>
          <span className="text-slate-300">Nashik Hospitals & Clinics</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
          <span className="text-slate-300">CBWTF Ambad Plant</span>
        </div>
      </div>
    </div>
  );
}
