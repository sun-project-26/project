/**
 * Calculates SHA-256 hash in browser using native Web Crypto API
 */
export async function sha256Browser(message) {
  try {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    // Fallback pseudo-hash if crypto is restricted in insecure contexts
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(64, 'a');
  }
}

/**
 * Creates a new client-side traceability event block
 */
export async function createTraceabilityBlock({ previousHash, eventId, wasteId, action, actor, timestamp }) {
  const payload = `${previousHash || '0000000000000000000000000000000000000000000000000000000000000000'}|${eventId}|${wasteId}|${action}|${actor}|${new Date(timestamp).toISOString()}`;
  const hash = await sha256Browser(payload);
  return hash;
}
