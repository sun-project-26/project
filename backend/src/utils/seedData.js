const { calculateEventHash } = require('../services/hashService');

const initialSmartBins = [
  {
    binId: 'BIN-YEL-01',
    category: 'YELLOW',
    facility: 'District Civil Hospital Nashik - Ward 4B',
    locationTag: 'Infectious & Surgical Ward 4B',
    currentLoadKg: 342.0,
    maxCapacityKg: 500.0,
    fillPercentage: 68.4,
    itemCount: 142,
    status: 'Near Capacity',
    wasteTypesIncluded: ['Anatomical waste', 'Soiled dressings', 'Placenta & tissues', 'Expired cytotoxic drugs'],
    treatmentProtocol: 'High-Temperature Incineration / Plasma Pyrolysis (>1050°C)',
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    binId: 'BIN-RED-01',
    category: 'RED',
    facility: 'District Civil Hospital Nashik - ICU Block',
    locationTag: 'Intensive Care Unit & Dialysis',
    currentLoadKg: 215.5,
    maxCapacityKg: 500.0,
    fillPercentage: 43.1,
    itemCount: 289,
    status: 'Active',
    wasteTypesIncluded: ['IV tubing & bottles', 'Catheters & urine bags', 'Disposable latex gloves', 'Vacutainers'],
    treatmentProtocol: 'Autoclaving / Hydroclaving followed by Shredding & Regulated Recycling',
    lastUpdated: new Date(Date.now() - 25 * 60 * 1000)
  },
  {
    binId: 'BIN-WHT-01',
    category: 'WHITE',
    facility: 'District Civil Hospital Nashik - Minor OT',
    locationTag: 'Emergency Care & Minor OT (Trimbak Rd)',
    currentLoadKg: 78.2,
    maxCapacityKg: 100.0,
    fillPercentage: 78.2,
    itemCount: 460,
    status: 'Near Capacity',
    wasteTypesIncluded: ['Needles with fixed syringes', 'Surgical scalpels & blades', 'Lancets & suture needles', 'Sharps in puncture-proof boxes'],
    treatmentProtocol: 'Dry Heat Sterilization / Autoclaving + Encapsulation in Concrete / Metal Shredding',
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    binId: 'BIN-BLU-01',
    category: 'BLUE',
    facility: 'District Civil Hospital Nashik - Central Lab',
    locationTag: 'Diagnostic Pathology & Pharmacy',
    currentLoadKg: 112.0,
    maxCapacityKg: 400.0,
    fillPercentage: 28.0,
    itemCount: 88,
    status: 'Normal',
    wasteTypesIncluded: ['Contaminated medicine vials', 'Glass ampoules', 'Microscope slides', 'Orthopedic metallic implants'],
    treatmentProtocol: 'Disinfection with 1-2% Sodium Hypochlorite followed by Autoclaving & Glass Cullet Recycling',
    lastUpdated: new Date(Date.now() - 40 * 60 * 1000)
  }
];

const initialMobileUnits = [
  {
    unitId: 'MS-01',
    regNumber: 'MH-15-BW-104',
    driver: 'Vikram Patil',
    phone: '+91 98230 45671',
    status: 'En Route',
    latitude: 19.9972,
    longitude: 73.7801,
    assignedPickup: 'PCK-8921',
    facilityTarget: 'District Civil Hospital Nashik - Ward 4B',
    eta: '4 mins',
    batteryLevel: 89,
    currentCapacityKg: 140,
    maxCapacityKg: 600,
    speedKmH: 34,
    headingDeg: 45
  },
  {
    unitId: 'MS-02',
    regNumber: 'MH-15-BW-208',
    driver: 'Rajesh Kulkarni',
    phone: '+91 98221 88345',
    status: 'Collecting',
    latitude: 19.9868,
    longitude: 73.7925,
    assignedPickup: 'PCK-8922',
    facilityTarget: 'Wockhardt Hospital Nashik - Wadala Naka',
    eta: 'On Site',
    batteryLevel: 76,
    currentCapacityKg: 280,
    maxCapacityKg: 600,
    speedKmH: 0,
    headingDeg: 120
  },
  {
    unitId: 'MS-03',
    regNumber: 'MH-15-BW-312',
    driver: 'Sunil Borse',
    phone: '+91 98500 12984',
    status: 'Available',
    latitude: 19.9980,
    longitude: 73.7450,
    assignedPickup: null,
    facilityTarget: 'Satpur MIDC Central Dispatch Hub',
    eta: 'Standby at Hub',
    batteryLevel: 98,
    currentCapacityKg: 0,
    maxCapacityKg: 600,
    speedKmH: 0,
    headingDeg: 0
  },
  {
    unitId: 'MS-04',
    regNumber: 'MH-15-BW-416',
    driver: 'Deepak Gaikwad',
    phone: '+91 98902 77419',
    status: 'Returning',
    latitude: 19.9380,
    longitude: 73.7420,
    assignedPickup: 'PCK-8919',
    facilityTarget: 'CBWTF Ambad Treatment Plant, Nashik',
    eta: '12 mins to Treatment Plant',
    batteryLevel: 62,
    currentCapacityKg: 490,
    maxCapacityKg: 600,
    speedKmH: 42,
    headingDeg: 230
  }
];

const initialPickupJobs = [
  {
    pickupId: 'PCK-8921',
    facility: 'District Civil Hospital Nashik - Ward 4B',
    wasteCategory: 'YELLOW',
    weight: 24.5,
    priority: 'Critical',
    assignedUnit: 'MS-01 (MH-15-BW-104)',
    status: 'En Route',
    pickupNotes: 'Post-op surgical anatomical waste ready at Trimbak Naka bay',
    latitude: 19.9972,
    longitude: 73.7801,
    scheduledTime: new Date(Date.now() - 30 * 60 * 1000),
    completedAt: null
  },
  {
    pickupId: 'PCK-8922',
    facility: 'Wockhardt Hospital Nashik - ICU Block',
    wasteCategory: 'WHITE',
    weight: 12.0,
    priority: 'High',
    assignedUnit: 'MS-02 (MH-15-BW-208)',
    status: 'Collecting',
    pickupNotes: 'Puncture proof boxes sealed and barcoded at Wadala Naka dock',
    latitude: 19.9868,
    longitude: 73.7925,
    scheduledTime: new Date(Date.now() - 60 * 60 * 1000),
    completedAt: null
  },
  {
    pickupId: 'PCK-8923',
    facility: 'Sahyadri Super Speciality Hospital - Dialysis',
    wasteCategory: 'RED',
    weight: 38.0,
    priority: 'Medium',
    assignedUnit: 'Unassigned',
    status: 'Pending',
    pickupNotes: 'Contaminated dialysis tubing batch 4, Indira Nagar facility',
    latitude: 19.9654,
    longitude: 73.7788,
    scheduledTime: new Date(),
    completedAt: null
  },
  {
    pickupId: 'PCK-8924',
    facility: 'HCG Manavata Cancer Centre - Oncology OT',
    wasteCategory: 'BLUE',
    weight: 8.5,
    priority: 'Low',
    assignedUnit: 'Unassigned',
    status: 'Pending',
    pickupNotes: 'Broken chemo glass vials & ampoules, Mumbai Naka hub',
    latitude: 19.9882,
    longitude: 73.7685,
    scheduledTime: new Date(),
    completedAt: null
  },
  {
    pickupId: 'PCK-8919',
    facility: 'Ashoka Medicover Hospitals - Ashoka Marg',
    wasteCategory: 'YELLOW',
    weight: 55.0,
    priority: 'Critical',
    assignedUnit: 'MS-04 (MH-15-BW-416)',
    status: 'Completed',
    pickupNotes: 'Delivered to CBWTF Ambad Treatment Plant',
    latitude: 19.9725,
    longitude: 73.8050,
    scheduledTime: new Date(Date.now() - 3 * 3600 * 1000),
    completedAt: new Date(Date.now() - 45 * 60 * 1000)
  }
];

// Generate seed traceability events
const seedEvents = [];
const sampleWasteId = 'WST-2026-081';
const seedTimeline = [
  { step: 1, action: 'WASTE_GENERATED', actor: 'Nurse Staff: Priya Sharma', location: 'District Civil Hospital Nashik - Surgery OT #2', timeOffset: -120 },
  { step: 2, action: 'AI_CLASSIFIED', actor: 'MediSort Vision Engine v1.0', location: 'Point-of-Care Terminal #4 (Trimbak Rd)', timeOffset: -118 },
  { step: 3, action: 'BIN_ASSIGNED', actor: 'Smart Bin Controller', location: 'White Puncture-Proof Container #01 (Ward 4B)', timeOffset: -115 },
  { step: 4, action: 'PICKUP_CREATED', actor: 'Automated Dispatch Rule #14', location: 'Nashik Central Control Hub', timeOffset: -60 },
  { step: 5, action: 'UNIT_ASSIGNED', actor: 'Fleet Coordinator (Vehicle MH-15-BW-104)', location: 'Satpur MIDC Dispatch Hub', timeOffset: -45 },
  { step: 6, action: 'PICKUP_COLLECTED', actor: 'Driver: Vikram Patil', location: 'District Civil Hospital Loading Bay (Trimbak Naka)', timeOffset: -15 },
  { step: 7, action: 'DISPOSAL_COMPLETED', actor: 'CBWTF Operator: Arvind Koli', location: 'CBWTF Ambad Bio-Medical Treatment Plant, Nashik', timeOffset: -2 }
];

let lastHash = '0000000000000000000000000000000000000000000000000000000000000000';
seedTimeline.forEach((item, idx) => {
  const eventId = `EVT-${8820 + idx}`;
  const timestamp = new Date(Date.now() + item.timeOffset * 60 * 1000);
  const hash = calculateEventHash({
    previousHash: lastHash,
    eventId,
    wasteId: sampleWasteId,
    action: item.action,
    actor: item.actor,
    timestamp
  });

  seedEvents.push({
    eventId,
    wasteId: sampleWasteId,
    pickupId: 'PCK-8921',
    stepIndex: item.step,
    action: item.action,
    actor: item.actor,
    location: item.location,
    timestamp,
    hash,
    previousHash: lastHash,
    meta: {
      category: 'WHITE',
      confidence: 0.968,
      weightKg: 24.5
    }
  });

  lastHash = hash;
});

module.exports = {
  initialSmartBins,
  initialMobileUnits,
  initialPickupJobs,
  seedEvents,
  sampleWasteId
};
