const crypto = require('crypto');

/**
 * Computes a tamper-evident SHA-256 hash for a traceability event.
 * Hash is computed as SHA256(previousHash + eventId + wasteId + action + actor + timestamp).
 */
const calculateEventHash = ({ previousHash, eventId, wasteId, action, actor, timestamp }) => {
  const payload = `${previousHash || '0000000000000000000000000000000000000000000000000000000000000000'}|${eventId}|${wasteId}|${action}|${actor}|${new Date(timestamp).toISOString()}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
};

/**
 * Validates integrity of a chain of events.
 */
const verifyChainIntegrity = (events) => {
  if (!events || events.length === 0) return { valid: true, count: 0 };
  
  for (let i = 0; i < events.length; i++) {
    const current = events[i];
    const prevHash = i === 0 ? '0000000000000000000000000000000000000000000000000000000000000000' : events[i - 1].hash;
    
    if (current.previousHash !== prevHash) {
      return { valid: false, brokenIndex: i, reason: 'Previous hash mismatch' };
    }

    const expectedHash = calculateEventHash({
      previousHash: prevHash,
      eventId: current.eventId,
      wasteId: current.wasteId,
      action: current.action,
      actor: current.actor,
      timestamp: current.timestamp
    });

    if (current.hash !== expectedHash) {
      return { valid: false, brokenIndex: i, reason: 'Current hash tampering detected' };
    }
  }

  return { valid: true, count: events.length };
};

module.exports = {
  calculateEventHash,
  verifyChainIntegrity
};
