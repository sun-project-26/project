const { initialSmartBins, initialMobileUnits, initialPickupJobs, seedEvents, sampleWasteId } = require('../utils/seedData');
const { calculateEventHash } = require('./hashService');

class MockDataStore {
  constructor() {
    this.bins = JSON.parse(JSON.stringify(initialSmartBins));
    this.mobileUnits = JSON.parse(JSON.stringify(initialMobileUnits));
    this.pickups = JSON.parse(JSON.stringify(initialPickupJobs));
    this.events = JSON.parse(JSON.stringify(seedEvents));
    this.wasteRecords = [
      {
        wasteId: sampleWasteId,
        category: 'WHITE',
        label: 'Used Syringe & Needles',
        confidence: 0.968,
        recommendedBin: 'WHITE',
        facility: 'District Civil Hospital Nashik - Ward 4B',
        reviewRequired: false,
        status: 'DISPOSED',
        hazardClass: 'Sharps / Puncture Hazard',
        treatmentMethod: 'Autoclaving + Encapsulation / Shredding',
        timestamp: new Date(Date.now() - 120 * 60 * 1000)
      }
    ];
  }

  // --- Smart Bins ---
  getBins() {
    return this.bins;
  }

  getBinById(binId) {
    return this.bins.find(b => b.binId === binId || b.category === binId.toUpperCase());
  }

  updateBin(binId, updates) {
    const bin = this.getBinById(binId);
    if (!bin) return null;
    Object.assign(bin, updates, { lastUpdated: new Date() });
    if (bin.currentLoadKg !== undefined && bin.maxCapacityKg) {
      bin.fillPercentage = Number(((bin.currentLoadKg / bin.maxCapacityKg) * 100).toFixed(1));
      if (bin.fillPercentage >= 90) bin.status = 'Critical Full';
      else if (bin.fillPercentage >= 65) bin.status = 'Near Capacity';
      else bin.status = 'Active';
    }
    return bin;
  }

  // --- Pickups ---
  getPickups(filters = {}) {
    let list = [...this.pickups];
    if (filters.status) list = list.filter(p => p.status.toLowerCase() === filters.status.toLowerCase());
    if (filters.category) list = list.filter(p => p.wasteCategory.toUpperCase() === filters.category.toUpperCase());
    return list.sort((a, b) => new Date(b.scheduledTime || b.createdAt || 0) - new Date(a.scheduledTime || a.createdAt || 0));
  }

  getPickupById(pickupId) {
    return this.pickups.find(p => p.pickupId === pickupId);
  }

  createPickup(data) {
    const pickupId = data.pickupId || `PCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPickup = {
      pickupId,
      facility: data.facility || 'District Civil Hospital Nashik',
      wasteCategory: data.wasteCategory || 'YELLOW',
      weight: Number(data.weight) || 10.0,
      priority: data.priority || 'Medium',
      assignedUnit: data.assignedUnit || 'Unassigned',
      status: data.status || 'Pending',
      pickupNotes: data.pickupNotes || '',
      latitude: data.latitude || 19.9972,
      longitude: data.longitude || 73.7801,
      scheduledTime: new Date(),
      completedAt: null
    };
    this.pickups.unshift(newPickup);

    // Also create a traceability event for this pickup
    this.addTraceabilityEvent({
      wasteId: `WST-PCK-${pickupId}`,
      pickupId: pickupId,
      action: 'PICKUP_CREATED',
      actor: 'MediSort Dispatcher AI',
      location: newPickup.facility,
      meta: { weight: newPickup.weight, priority: newPickup.priority }
    });

    return newPickup;
  }

  updatePickupStatus(pickupId, status, unitId) {
    const pickup = this.getPickupById(pickupId);
    if (!pickup) return null;
    pickup.status = status;
    if (unitId) pickup.assignedUnit = unitId;
    if (status === 'Completed') {
      pickup.completedAt = new Date();
    }

    // Add Traceability Event
    this.addTraceabilityEvent({
      wasteId: `WST-PCK-${pickupId}`,
      pickupId: pickupId,
      action: status === 'Completed' ? 'DISPOSAL_COMPLETED' : `STATUS_UPDATED_${status.toUpperCase().replace(/\s+/g, '_')}`,
      actor: unitId ? `Mobile Unit: ${unitId}` : 'Operations Center',
      location: pickup.facility,
      meta: { newStatus: status, unitId }
    });

    return pickup;
  }

  // --- Mobile Units ---
  getMobileUnits() {
    return this.mobileUnits;
  }

  getMobileUnitById(unitId) {
    return this.mobileUnits.find(u => u.unitId === unitId);
  }

  updateMobileUnit(unitId, updates) {
    const unit = this.getMobileUnitById(unitId);
    if (!unit) return null;
    Object.assign(unit, updates);
    return unit;
  }

  // --- Traceability ---
  getTraceability(queryId) {
    if (!queryId) return this.events;
    return this.events.filter(e => e.wasteId === queryId || e.pickupId === queryId || e.eventId === queryId);
  }

  addTraceabilityEvent({ wasteId, pickupId, action, actor, location, meta = {} }) {
    const lastEvent = this.events[this.events.length - 1];
    const previousHash = lastEvent ? lastEvent.hash : '0000000000000000000000000000000000000000000000000000000000000000';
    const eventId = `EVT-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date();
    const hash = calculateEventHash({
      previousHash,
      eventId,
      wasteId,
      action,
      actor,
      timestamp
    });

    const newEvent = {
      eventId,
      wasteId,
      pickupId: pickupId || null,
      stepIndex: this.events.filter(e => e.wasteId === wasteId).length + 1,
      action,
      actor,
      location,
      timestamp,
      hash,
      previousHash,
      meta
    };

    this.events.push(newEvent);
    return newEvent;
  }

  // --- Waste Records ---
  addWasteRecord(record) {
    this.wasteRecords.unshift(record);
    
    // Log to Traceability
    this.addTraceabilityEvent({
      wasteId: record.wasteId,
      action: 'AI_CLASSIFIED',
      actor: 'MediSort Vision Engine v1.0',
      location: record.facility || 'District Civil Hospital Nashik - Ward 4B',
      meta: {
        category: record.category,
        confidence: record.confidence,
        reviewRequired: record.reviewRequired
      }
    });

    return record;
  }

  getWasteRecords() {
    return this.wasteRecords;
  }

  // --- Analytics ---
  getAnalytics() {
    const totalPickups = this.pickups.length;
    const completedPickups = this.pickups.filter(p => p.status === 'Completed').length;
    const totalKg = this.bins.reduce((acc, b) => acc + b.currentLoadKg, 0) + 1284;

    return {
      totalWasteProcessedKg: totalKg,
      pendingPickupsCount: this.pickups.filter(p => p.status === 'Pending').length,
      activeMobileUnitsCount: this.mobileUnits.filter(u => u.status !== 'Maintenance').length,
      aiAccuracyPercentage: 96.8,
      categoryBreakdown: {
        YELLOW: 38,
        RED: 32,
        WHITE: 18,
        BLUE: 12
      },
      dailyVolumeKg: [
        { day: 'Mon', volume: 142 },
        { day: 'Tue', volume: 188 },
        { day: 'Wed', volume: 165 },
        { day: 'Thu', volume: 210 },
        { day: 'Fri', volume: 245 },
        { day: 'Sat', volume: 195 },
        { day: 'Sun', volume: 139 }
      ],
      slaCompletionRate: totalPickups > 0 ? Number(((completedPickups / totalPickups) * 100).toFixed(1)) : 94.2
    };
  }
}

const mockStore = new MockDataStore();
module.exports = mockStore;
