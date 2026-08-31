import { apiClient, checkBackendHealth } from './api';
import { INITIAL_MOBILE_UNITS } from '../data/mockData';

let localUnits = [...INITIAL_MOBILE_UNITS];

export async function fetchMobileUnits() {
  const isOnline = await checkBackendHealth();
  if (isOnline) {
    try {
      const res = await apiClient.get('/mobile-units');
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {
      console.warn('[FleetService] Backend error, using local fleet state');
    }
  }
  return localUnits;
}

export function updateLocalUnitCoordinates(unitId, lat, lng, speed, eta) {
  const unit = localUnits.find(u => u.unitId === unitId);
  if (unit) {
    unit.latitude = lat;
    unit.longitude = lng;
    if (speed !== undefined) unit.speedKmH = speed;
    if (eta !== undefined) unit.eta = eta;
  }
  return unit;
}
