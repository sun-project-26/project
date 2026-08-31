const { isUsingMongo } = require('../config/db');
const TraceabilityEvent = require('../models/TraceabilityEvent');
const mockStore = require('../services/mockStore');
const { verifyChainIntegrity, calculateEventHash } = require('../services/hashService');

// GET /api/traceability/:id
const getTraceabilityByWasteId = async (req, res, next) => {
  try {
    const { id } = req.params;
    let events = [];

    if (isUsingMongo()) {
      events = await TraceabilityEvent.find({
        $or: [{ wasteId: id }, { pickupId: id }, { eventId: id }]
      }).sort({ stepIndex: 1, timestamp: 1 });
    } else {
      events = mockStore.getTraceability(id);
    }

    if (!events || events.length === 0) {
      // Fallback: return default seed events for sample demo
      events = mockStore.getTraceability('WST-2026-081');
    }

    const verification = verifyChainIntegrity(events);

    res.status(200).json({
      success: true,
      wasteId: id,
      count: events.length,
      isChainIntact: verification.valid,
      verificationDetails: verification,
      data: events
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/traceability/event
const createTraceabilityEvent = async (req, res, next) => {
  try {
    const { wasteId, pickupId, action, actor, location, meta } = req.body;
    if (!wasteId || !action || !actor || !location) {
      return res.status(400).json({ success: false, message: 'Missing required event fields' });
    }

    let created;
    if (isUsingMongo()) {
      const lastEvent = await TraceabilityEvent.findOne({ wasteId }).sort({ stepIndex: -1 });
      const previousHash = lastEvent ? lastEvent.hash : '0000000000000000000000000000000000000000000000000000000000000000';
      const eventId = `EVT-${Math.floor(10000 + Math.random() * 90000)}`;
      const timestamp = new Date();
      const hash = calculateEventHash({ previousHash, eventId, wasteId, action, actor, timestamp });
      const stepIndex = lastEvent ? lastEvent.stepIndex + 1 : 1;

      created = new TraceabilityEvent({
        eventId,
        wasteId,
        pickupId,
        stepIndex,
        action,
        actor,
        location,
        timestamp,
        hash,
        previousHash,
        meta: meta || {}
      });
      await created.save();
    } else {
      created = mockStore.addTraceabilityEvent({ wasteId, pickupId, action, actor, location, meta });
    }

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTraceabilityByWasteId,
  createTraceabilityEvent
};
