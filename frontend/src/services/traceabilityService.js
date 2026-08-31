import { apiClient, checkBackendHealth } from './api';
import { SAMPLE_TRACEABILITY_CHAIN } from '../data/mockData';
import { createTraceabilityBlock } from '../utils/hashChain';

let localEvents = [...SAMPLE_TRACEABILITY_CHAIN];

export async function fetchTraceability(wasteId = 'WST-2026-081') {
  const isOnline = await checkBackendHealth();
  if (isOnline) {
    try {
      const res = await apiClient.get(`/traceability/${wasteId}`);
      if (res.data?.success) {
        return {
          events: res.data.data,
          isChainIntact: res.data.isChainIntact,
          wasteId: res.data.wasteId
        };
      }
    } catch (e) {
      console.warn('[TraceabilityService] Backend error, using local blockchain ledger');
    }
  }

  return {
    events: localEvents,
    isChainIntact: true,
    wasteId
  };
}

export async function appendTraceabilityEvent({ wasteId, action, title, actor, location, meta }) {
  const lastEvent = localEvents[localEvents.length - 1];
  const previousHash = lastEvent ? lastEvent.hash : '0000000000000000000000000000000000000000000000000000000000000000';
  const eventId = `EVT-${Math.floor(10000 + Math.random() * 90000)}`;
  const timestamp = 'Just now';

  const hash = await createTraceabilityBlock({
    previousHash,
    eventId,
    wasteId: wasteId || 'WST-2026-081',
    action,
    actor,
    timestamp: new Date().toISOString()
  });

  const newEvent = {
    stepIndex: localEvents.length + 1,
    eventId,
    wasteId: wasteId || 'WST-2026-081',
    action,
    title: title || action.replace(/_/g, ' '),
    actor,
    location,
    timestamp,
    status: 'Verified',
    hash,
    previousHash,
    meta: meta || {}
  };

  localEvents.push(newEvent);
  return newEvent;
}
