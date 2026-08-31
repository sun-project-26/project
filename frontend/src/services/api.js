import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3500,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isBackendLive = null;
let lastCheckTime = 0;

export async function checkBackendHealth() {
  const now = Date.now();
  if (isBackendLive !== null && now - lastCheckTime < 10000) {
    return isBackendLive;
  }

  try {
    const res = await apiClient.get('/health', { timeout: 1500 });
    isBackendLive = res.data && res.data.status === 'ok';
    lastCheckTime = now;
    return isBackendLive;
  } catch (e) {
    isBackendLive = false;
    lastCheckTime = now;
    return false;
  }
}

export function getBackendStatusSync() {
  return isBackendLive ?? false;
}
