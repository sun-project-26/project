import { apiClient, checkBackendHealth } from './api';
import { INITIAL_PICKUPS } from '../data/mockData';

let localPickups = [...INITIAL_PICKUPS];

export async function fetchPickups(filters = {}) {
  const isOnline = await checkBackendHealth();
  if (isOnline) {
    try {
      const res = await apiClient.get('/pickups', { params: filters });
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {
      console.warn('[PickupService] Backend error, using local state');
    }
  }

  let list = [...localPickups];
  if (filters.status) {
    list = list.filter(p => p.status.toLowerCase() === filters.status.toLowerCase());
  }
  if (filters.category) {
    list = list.filter(p => p.wasteCategory.toUpperCase() === filters.category.toUpperCase());
  }
  return list;
}

export async function createPickup(payload) {
  const isOnline = await checkBackendHealth();
  if (isOnline) {
    try {
      const res = await apiClient.post('/pickups', payload);
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {
      console.warn('[PickupService] Backend error on create, saving locally');
    }
  }

  const newPickup = {
    pickupId: `PCK-${Math.floor(1000 + Math.random() * 9000)}`,
    facility: payload.facility || 'District Civil Hospital Nashik - Ward 4B',
    wasteCategory: payload.wasteCategory || 'YELLOW',
    weight: Number(payload.weight) || 12.5,
    priority: payload.priority || 'Medium',
    assignedUnit: payload.assignedUnit || 'Unassigned',
    status: 'Pending',
    pickupNotes: payload.pickupNotes || '',
    createdAt: 'Just now',
    coords: [19.9972 + (Math.random() - 0.5) * 0.01, 73.7801 + (Math.random() - 0.5) * 0.01]
  };

  localPickups.unshift(newPickup);
  return newPickup;
}

export async function updatePickupStatus(pickupId, status, unitId) {
  const isOnline = await checkBackendHealth();
  if (isOnline) {
    try {
      const res = await apiClient.patch(`/pickups/${pickupId}/status`, { status, unitId });
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (e) {
      console.warn('[PickupService] Backend error on patch, updating local');
    }
  }

  const pickup = localPickups.find(p => p.pickupId === pickupId);
  if (pickup) {
    pickup.status = status;
    if (unitId) pickup.assignedUnit = unitId;
  }
  return pickup;
}
