export const SAMPLE_WASTE_ITEMS = [
  {
    id: 'sample-1',
    name: 'Used Disposable Syringe with Needle',
    category: 'WHITE',
    label: 'Used Syringe (Sharps)',
    confidence: 0.968,
    recommendedBin: 'WHITE',
    hazardClass: 'Sharps / Puncture Hazard',
    reviewRequired: false,
    weightEstKg: 0.45,
    sampleImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    description: 'Plastic 5ml syringe with 22G fixed needle contaminated with blood serum.'
  },
  {
    id: 'sample-2',
    name: 'Contaminated Nitrile Gloves',
    category: 'RED',
    label: 'Contaminated Latex Gloves',
    confidence: 0.942,
    recommendedBin: 'RED',
    hazardClass: 'Contaminated Recyclable Plastics',
    reviewRequired: false,
    weightEstKg: 0.85,
    sampleImage: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop&q=80',
    description: 'Pair of purple nitrile exam gloves discarded after routine patient dressing.'
  },
  {
    id: 'sample-3',
    name: 'Blood-Soiled Surgical Cotton Gauze',
    category: 'YELLOW',
    label: 'Infectious Soiled Cotton Gauze',
    confidence: 0.975,
    recommendedBin: 'YELLOW',
    hazardClass: 'Highly Infectious Pathogen Category A',
    reviewRequired: false,
    weightEstKg: 1.20,
    sampleImage: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    description: 'Sterile gauze pad saturated with arterial blood from operating theater #2.'
  },
  {
    id: 'sample-4',
    name: 'Discarded Antibiotic Medicine Glass Vials',
    category: 'BLUE',
    label: 'Glass Antibiotic Vials',
    confidence: 0.951,
    recommendedBin: 'BLUE',
    hazardClass: 'Glassware & Chemical Residue',
    reviewRequired: false,
    weightEstKg: 0.60,
    sampleImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    description: 'Empty glass cephalosporin injectable vials with aluminum crimp seals.'
  },
  {
    id: 'sample-5',
    name: 'Unclear Mixed Clinical Swab (Low Confidence Demo)',
    category: 'YELLOW',
    label: 'Unidentified Swab & Plastic Strip',
    confidence: 0.742,
    recommendedBin: 'YELLOW',
    hazardClass: 'Potential Pathogen (Unverified)',
    reviewRequired: true,
    weightEstKg: 0.30,
    sampleImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80',
    description: 'Blurry specimen with mixed materials triggering Human-in-the-Loop review protocol.'
  }
];

export const INITIAL_SMART_BINS = [
  {
    binId: 'BIN-YEL-01',
    category: 'YELLOW',
    facility: 'District Civil Hospital Nashik',
    locationTag: 'Infectious & Surgical Ward 4B',
    currentLoadKg: 342.0,
    maxCapacityKg: 500.0,
    fillPercentage: 68.4,
    itemCount: 142,
    status: 'Near Capacity',
    wasteTypesIncluded: ['Anatomical waste', 'Soiled dressings', 'Placenta & tissues', 'Expired cytotoxic drugs'],
    treatmentProtocol: 'High-Temperature Incineration / Plasma Pyrolysis (>1050°C)',
    lastUpdated: '10 mins ago'
  },
  {
    binId: 'BIN-RED-01',
    category: 'RED',
    facility: 'District Civil Hospital Nashik',
    locationTag: 'Intensive Care Unit (ICU Block)',
    currentLoadKg: 215.5,
    maxCapacityKg: 500.0,
    fillPercentage: 43.1,
    itemCount: 289,
    status: 'Active',
    wasteTypesIncluded: ['IV tubing & bottles', 'Catheters & urine bags', 'Disposable latex gloves', 'Vacutainers'],
    treatmentProtocol: 'Autoclaving / Hydroclaving followed by Shredding & Regulated Recycling',
    lastUpdated: '25 mins ago'
  },
  {
    binId: 'BIN-WHT-01',
    category: 'WHITE',
    facility: 'District Civil Hospital Nashik',
    locationTag: 'Emergency Care & Minor OT (Trimbak Rd)',
    currentLoadKg: 78.2,
    maxCapacityKg: 100.0,
    fillPercentage: 78.2,
    itemCount: 460,
    status: 'Near Capacity',
    wasteTypesIncluded: ['Needles with fixed syringes', 'Surgical scalpels & blades', 'Lancets & suture needles'],
    treatmentProtocol: 'Dry Heat Sterilization / Autoclaving + Encapsulation in Concrete',
    lastUpdated: '5 mins ago'
  },
  {
    binId: 'BIN-BLU-01',
    category: 'BLUE',
    facility: 'District Civil Hospital Nashik',
    locationTag: 'Diagnostic Pathology & Central Pharmacy',
    currentLoadKg: 112.0,
    maxCapacityKg: 400.0,
    fillPercentage: 28.0,
    itemCount: 88,
    status: 'Normal',
    wasteTypesIncluded: ['Contaminated medicine vials', 'Glass ampoules', 'Microscope slides', 'Metal implants'],
    treatmentProtocol: 'Disinfection (1% Sodium Hypochlorite) followed by Autoclaving & Glass Cullet Recycling',
    lastUpdated: '35 mins ago'
  }
];

export const INITIAL_PICKUPS = [
  {
    pickupId: 'PCK-8921',
    facility: 'District Civil Hospital Nashik - Ward 4B',
    wasteCategory: 'YELLOW',
    weight: 24.5,
    priority: 'Critical',
    assignedUnit: 'MS-01 (MH-15-BW-104)',
    status: 'En Route',
    pickupNotes: 'Post-op surgical anatomical waste ready at Trimbak Naka gate',
    createdAt: '25 mins ago',
    coords: [19.9972, 73.7801]
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
    createdAt: '45 mins ago',
    coords: [19.9868, 73.7925]
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
    createdAt: '1 hr ago',
    coords: [19.9654, 73.7788]
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
    createdAt: '2 hrs ago',
    coords: [19.9882, 73.7685]
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
    createdAt: '3 hrs ago',
    coords: [19.9725, 73.8050]
  }
];

export const INITIAL_MOBILE_UNITS = [
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
    eta: 'Standby at Satpur Hub',
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
    facilityTarget: 'CBWTF Ambad Bio-Medical Treatment Plant, Nashik',
    eta: 'Arriving at CBWTF Ambad',
    batteryLevel: 62,
    currentCapacityKg: 490,
    maxCapacityKg: 600,
    speedKmH: 42,
    headingDeg: 230
  }
];

export const MAP_FACILITIES = [
  {
    id: 'FAC-01',
    name: 'District Civil Hospital Nashik',
    address: 'Trimbak Naka, Trimbakeshwar Road, Nashik 422002',
    type: 'District Apex Hospital',
    coords: [19.9972, 73.7801],
    pendingKg: 342,
    status: 'Active'
  },
  {
    id: 'FAC-02',
    name: 'Wockhardt Hospital Nashik',
    address: 'Wani House, Wadala Naka, Mumbai-Agra Highway, Nashik 422001',
    type: 'Multi-Speciality Hospital',
    coords: [19.9868, 73.7925],
    pendingKg: 120,
    status: 'Collecting'
  },
  {
    id: 'FAC-03',
    name: 'Sahyadri Super Speciality Hospital',
    address: 'Wadala-Pathardi Road, Indira Nagar, Nashik 422009',
    type: 'Super Speciality Hospital',
    coords: [19.9654, 73.7788],
    pendingKg: 85,
    status: 'Pending'
  },
  {
    id: 'FAC-04',
    name: 'HCG Manavata Cancer Centre',
    address: 'Near MICO Circle, Mumbai Naka, Trambakeshwar Rd, Nashik 422002',
    type: 'Oncology Centre',
    coords: [19.9882, 73.7685],
    pendingKg: 38,
    status: 'Pending'
  },
  {
    id: 'FAC-05',
    name: 'Ashoka Medicover Hospitals',
    address: 'Sawata Mali Marg, Ashoka Marg, Wadala Road, Nashik 422006',
    type: 'Tertiary Care Hospital',
    coords: [19.9725, 73.8050],
    pendingKg: 65,
    status: 'Active'
  },
  {
    id: 'FAC-06',
    name: 'Apollo Hospitals Nashik',
    address: 'Swaminarayan Nagar, New Adgaon Naka, Panchavati, Nashik 422003',
    type: 'Multi-Speciality Centre',
    coords: [20.0165, 73.8120],
    pendingKg: 48,
    status: 'Active'
  },
  {
    id: 'FAC-07',
    name: 'CBWTF Ambad Treatment Plant (Water Grace)',
    address: 'MIDC Ambad / Vilholi Environmental Cluster, Nashik 422010',
    type: 'Treatment Facility',
    coords: [19.9380, 73.7420],
    pendingKg: 0,
    status: 'Hub'
  }
];

export const SAMPLE_TRACEABILITY_CHAIN = [
  {
    stepIndex: 1,
    eventId: 'EVT-8820',
    wasteId: 'WST-2026-081',
    action: 'WASTE_GENERATED',
    title: 'Waste Generated at Point of Care',
    actor: 'Nurse Staff: Priya Sharma',
    location: 'District Civil Hospital Nashik - Surgery OT #2',
    timestamp: '14:30 PM, Today',
    status: 'Verified',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    meta: { weight: '0.45 kg', department: 'Surgical Trauma Wing' }
  },
  {
    stepIndex: 2,
    eventId: 'EVT-8821',
    wasteId: 'WST-2026-081',
    action: 'AI_CLASSIFIED',
    title: 'AI Vision Classification',
    actor: 'MediSort Vision Engine v1.0',
    location: 'Point-of-Care Terminal #4 (Trimbak Rd)',
    timestamp: '14:32 PM, Today',
    status: 'Verified',
    hash: 'a4f8b9e1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
    previousHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    meta: { category: 'WHITE', confidence: '96.8%', item: 'Used Syringe' }
  },
  {
    stepIndex: 3,
    eventId: 'EVT-8822',
    wasteId: 'WST-2026-081',
    action: 'BIN_ASSIGNED',
    title: 'Smart Bin Recommendation Accepted',
    actor: 'Smart Bin Controller',
    location: 'White Puncture-Proof Container #01 (Ward 4B)',
    timestamp: '14:33 PM, Today',
    status: 'Verified',
    hash: '9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e',
    previousHash: 'a4f8b9e1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
    meta: { containerType: 'Puncture-proof translucent white box' }
  },
  {
    stepIndex: 4,
    eventId: 'EVT-8823',
    wasteId: 'WST-2026-081',
    action: 'PICKUP_CREATED',
    title: 'Automated Pickup Dispatch Created',
    actor: 'MediSort Cloud Dispatcher',
    location: 'Nashik Central Control Hub',
    timestamp: '15:00 PM, Today',
    status: 'Verified',
    hash: 'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
    previousHash: '9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e',
    meta: { pickupId: 'PCK-8921', priority: 'Critical' }
  },
  {
    stepIndex: 5,
    eventId: 'EVT-8824',
    wasteId: 'WST-2026-081',
    action: 'UNIT_ASSIGNED',
    title: 'Mobile Unit Dispatched',
    actor: 'Fleet Coordinator (Vehicle MH-15-BW-104)',
    location: 'Satpur MIDC Dispatch Hub',
    timestamp: '15:15 PM, Today',
    status: 'Verified',
    hash: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
    previousHash: 'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
    meta: { driver: 'Vikram Patil', vehicle: 'MH-15-BW-104 (Unit MS-01)' }
  },
  {
    stepIndex: 6,
    eventId: 'EVT-8825',
    wasteId: 'WST-2026-081',
    action: 'PICKUP_COLLECTED',
    title: 'Waste Collected & Weighed',
    actor: 'Driver: Vikram Patil',
    location: 'District Civil Hospital Loading Bay (Trimbak Naka)',
    timestamp: '15:45 PM, Today',
    status: 'Verified',
    hash: '7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c',
    previousHash: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
    meta: { grossWeightKg: 24.5, qrCodeScanned: true }
  },
  {
    stepIndex: 7,
    eventId: 'EVT-8826',
    wasteId: 'WST-2026-081',
    action: 'DISPOSAL_COMPLETED',
    title: 'Central Autoclave Sterilization & Disposal Completed',
    actor: 'CBWTF Operator: Arvind Koli',
    location: 'CBWTF Ambad Bio-Medical Treatment Plant, Nashik',
    timestamp: '16:30 PM, Today',
    status: 'Verified',
    hash: '8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
    previousHash: '7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c',
    meta: { method: 'Autoclaving + Shredding + Encapsulation', certificateId: 'MPCB-NASHIK-BMW-9941' }
  }
];
