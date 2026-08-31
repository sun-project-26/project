import { apiClient, checkBackendHealth } from './api';
import { SAMPLE_WASTE_ITEMS } from '../data/mockData';

export async function classifyWasteImage(formDataOrPayload) {
  const isOnline = await checkBackendHealth();

  if (isOnline) {
    try {
      const response = await apiClient.post('/waste/classify', formDataOrPayload, {
        headers: formDataOrPayload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });
      if (response.data && response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      console.warn('[WasteService] Backend request failed, falling back to client mock:', err.message);
    }
  }

  // Client-Side Deterministic Mock Classifier
  // Simulate AI latency for realistic demo experience
  await new Promise((resolve) => setTimeout(resolve, 800));

  let labelHint = '';
  if (formDataOrPayload instanceof FormData) {
    const file = formDataOrPayload.get('image');
    labelHint = file ? file.name : (formDataOrPayload.get('label') || '');
  } else if (formDataOrPayload && typeof formDataOrPayload === 'object') {
    labelHint = formDataOrPayload.label || formDataOrPayload.labelHint || '';
  }

  const hintLower = (labelHint || '').toLowerCase();
  let matched = SAMPLE_WASTE_ITEMS[0]; // Default: Used Syringe (White)

  if (hintLower.includes('glove') || hintLower.includes('plastic') || hintLower.includes('red') || hintLower.includes('tubing')) {
    matched = SAMPLE_WASTE_ITEMS[1];
  } else if (hintLower.includes('blood') || hintLower.includes('gauze') || hintLower.includes('cotton') || hintLower.includes('yellow')) {
    matched = SAMPLE_WASTE_ITEMS[2];
  } else if (hintLower.includes('vial') || hintLower.includes('glass') || hintLower.includes('ampoule') || hintLower.includes('blue')) {
    matched = SAMPLE_WASTE_ITEMS[3];
  } else if (hintLower.includes('unclear') || hintLower.includes('blurry') || hintLower.includes('low')) {
    matched = SAMPLE_WASTE_ITEMS[4];
  }

  const wasteId = `WST-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;

  return {
    wasteId,
    category: matched.category,
    label: matched.label,
    confidence: matched.confidence,
    recommendedBin: matched.recommendedBin,
    reviewRequired: matched.reviewRequired,
    hazardClass: matched.hazardClass,
    treatmentMethod: matched.category === 'YELLOW' ? 'High-Temperature Incineration' : matched.category === 'RED' ? 'Autoclaving + Shredding' : matched.category === 'WHITE' ? 'Dry Heat + Encapsulation' : 'Sodium Hypochlorite + Recycling',
    facility: 'District Civil Hospital Nashik - Ward 4B',
    timestamp: new Date().toISOString(),
    source: 'client-offline-engine'
  };
}

export async function fetchWasteLogs() {
  const isOnline = await checkBackendHealth();
  if (isOnline) {
    try {
      const res = await apiClient.get('/waste');
      if (res.data?.success) return res.data.data;
    } catch (e) {
      console.warn('[WasteService] Failed to fetch logs from backend');
    }
  }

  return SAMPLE_WASTE_ITEMS.map((item, idx) => ({
    wasteId: `WST-2026-${100 + idx}`,
    category: item.category,
    label: item.label,
    confidence: item.confidence,
    recommendedBin: item.recommendedBin,
    facility: 'District Civil Hospital Nashik - Ward 4B',
    status: 'BINNED',
    timestamp: new Date(Date.now() - idx * 3600 * 1000).toISOString()
  }));
}
