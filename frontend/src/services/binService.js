import { apiClient, checkBackendHealth } from './api';
import { INITIAL_SMART_BINS } from '../data/mockData';

let localBins = [...INITIAL_SMART_BINS];

export async function fetchBins() {
  const isOnline = await checkBackendHealth();
  if (isOnline) {
    try {
      const res = await apiClient.get('/bins');
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {
      console.warn('[BinService] Backend error, using local bins state');
    }
  }
  return localBins;
}

export async function updateBinLoad(binId, addedWeightKg) {
  const isOnline = await checkBackendHealth();
  const bin = localBins.find(b => b.binId === binId || b.category === binId.toUpperCase());
  if (!bin) return null;

  const newLoad = Math.min(bin.maxCapacityKg, bin.currentLoadKg + Number(addedWeightKg));
  const newFill = Number(((newLoad / bin.maxCapacityKg) * 100).toFixed(1));
  const newStatus = newFill >= 90 ? 'Critical Full' : newFill >= 65 ? 'Near Capacity' : 'Active';

  if (isOnline) {
    try {
      const res = await apiClient.patch(`/bins/${binId}`, {
        currentLoadKg: newLoad,
        fillPercentage: newFill,
        status: newStatus
      });
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {
      console.warn('[BinService] Backend patch error, updating local state');
    }
  }

  bin.currentLoadKg = newLoad;
  bin.fillPercentage = newFill;
  bin.status = newStatus;
  bin.lastUpdated = 'Just now';
  return bin;
}
