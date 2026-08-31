import { useState, useEffect } from 'react';
import { fetchMobileUnits, updateLocalUnitCoordinates } from '../services/fleetService';

// Waypoint coordinates simulating realistic routes across Nashik healthcare hubs
const ROUTES = {
  'MS-01': [
    // Route around District Civil Hospital, Trimbak Naka, Mumbai Naka, and Wadala Naka
    [19.9972, 73.7801], // District Civil Hospital
    [19.9925, 73.7760], // Trimbakeshwar Rd Junction
    [19.9882, 73.7685], // HCG Manavata / Mumbai Naka
    [19.9868, 73.7925], // Wockhardt Hospital (Wadala Naka)
    [19.9910, 73.7850]  // Trimbak Naka return
  ],
  'MS-02': [
    // Route connecting Wockhardt, Ashoka Medicover, and Sahyadri Hospital (Indira Nagar)
    [19.9868, 73.7925], // Wockhardt Wadala Naka
    [19.9795, 73.7990], // Ashoka Marg approach
    [19.9725, 73.8050], // Ashoka Medicover Hospital
    [19.9680, 73.7890], // Govind Nagar Link
    [19.9654, 73.7788]  // Sahyadri Super Speciality (Indira Nagar)
  ],
  'MS-04': [
    // Transit from city center to CBWTF Ambad Bio-Medical Treatment Plant
    [19.9882, 73.7685], // Mumbai Naka Hub
    [19.9650, 73.7580], // Pathardi Phata
    [19.9520, 73.7490], // Garware Point / MIDC Ambad
    [19.9380, 73.7420], // CBWTF Ambad Treatment Plant
    [19.9440, 73.7460]  // Ambad Cluster return
  ]
};

export function useLiveFleet(pollingInterval = 3000) {
  const [units, setUnits] = useState([]);
  const [routeIndices, setRouteIndices] = useState({ 'MS-01': 0, 'MS-02': 0, 'MS-04': 0 });

  // Initial load
  useEffect(() => {
    fetchMobileUnits().then((data) => setUnits(data));
  }, []);

  // Real-time movement simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setRouteIndices((prevIndices) => {
        const nextIndices = { ...prevIndices };

        setUnits((prevUnits) =>
          prevUnits.map((unit) => {
            if (unit.status === 'En Route' || unit.status === 'Returning') {
              const route = ROUTES[unit.unitId];
              if (route) {
                const nextIdx = (prevIndices[unit.unitId] + 1) % route.length;
                nextIndices[unit.unitId] = nextIdx;
                const [lat, lng] = route[nextIdx];
                const speed = 25 + Math.floor(Math.random() * 20);
                const etaMins = Math.max(2, 10 - nextIdx * 2);
                
                updateLocalUnitCoordinates(unit.unitId, lat, lng, speed, `${etaMins} mins`);
                return {
                  ...unit,
                  latitude: lat,
                  longitude: lng,
                  speedKmH: speed,
                  eta: `${etaMins} mins`
                };
              }
            }
            return unit;
          })
        );

        return nextIndices;
      });
    }, pollingInterval);

    return () => clearInterval(timer);
  }, [pollingInterval]);

  return { units };
}
