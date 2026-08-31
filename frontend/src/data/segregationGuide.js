export const BMW_CATEGORIES = {
  YELLOW: {
    category: 'YELLOW',
    name: 'Yellow Category (Infectious / Anatomical)',
    hex: '#eab308',
    glowClass: 'glass-card-yellow',
    badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    iconName: 'Biohazard',
    hazard: 'Pathogenic & Highly Infectious Waste',
    wasteTypes: [
      'Human anatomical tissues & organs',
      'Animal anatomical waste & carcass',
      'Soiled cotton, bandages & plaster casts',
      'Expired cytotoxic & pharmaceutical drugs',
      'Discarded linen with blood fluids',
      'Microbiology & biotechnology cultures'
    ],
    containerType: 'Non-chlorinated yellow plastic bags with biohazard symbol',
    treatmentMethod: 'Incineration (>1050°C) or Plasma Pyrolysis / Deep Burial in remote zones',
    prohibitedItems: ['Chlorinated plastics', 'Needles & sharps', 'Glass ampoules'],
    complianceRule: 'Must be incinerated / treated within 48 hours of generation.'
  },
  RED: {
    category: 'RED',
    name: 'Red Category (Contaminated Recyclable Plastics)',
    hex: '#ef4444',
    glowClass: 'glass-card-red',
    badgeClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    iconName: 'Recycle',
    hazard: 'Contaminated Non-Sharps Plastic Materials',
    wasteTypes: [
      'Intravenous (IV) bottles & tubing',
      'Catheters & suction bags',
      'Urine bags & blood bags (post drainage)',
      'Disposable latex & nitrile examination gloves',
      'Dialysis kits & tubing accessories',
      'Vacutainers & plastic specimen cups'
    ],
    containerType: 'Red non-chlorinated plastic bags / autocalvable bins',
    treatmentMethod: 'Autoclaving / Hydroclaving / Microwaving followed by Mutilation, Shredding & Authorized Recycling',
    prohibitedItems: ['Human tissues', 'Sharps / needles', 'Cytotoxic drugs'],
    complianceRule: 'No chemical disinfection required if autoclaved within facility.'
  },
  WHITE: {
    category: 'WHITE',
    name: 'White Translucent (Sharps & Needles)',
    hex: '#f8fafc',
    glowClass: 'glass-card-white',
    badgeClass: 'bg-slate-200/20 text-slate-100 border-slate-300/40',
    iconName: 'Scissors',
    hazard: 'Puncture & Inoculation Sharps Hazard',
    wasteTypes: [
      'Needles with or without fixed syringes',
      'Surgical scalpels, blades & razors',
      'Lancets & suture needles',
      'Luer-lock needles & trocar tips',
      'Contaminated metal sharps'
    ],
    containerType: 'Puncture-proof, tamper-proof, leak-proof translucent white containers',
    treatmentMethod: 'Autoclaving or Dry Heat Sterilization followed by Encapsulation in Concrete or Metal Shredder',
    prohibitedItems: ['Plastic IV tubing', 'Soft dressings', 'Chemical fluids'],
    complianceRule: 'Never recap needles manually. Insert tip directly into needle destroyer/container.'
  },
  BLUE: {
    category: 'BLUE',
    name: 'Blue Category (Glassware & Metallic Implants)',
    hex: '#3b82f6',
    glowClass: 'glass-card-blue',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    iconName: 'FlaskConical',
    hazard: 'Broken Glassware & Cytotoxic Contaminants',
    wasteTypes: [
      'Contaminated glass medicine vials',
      'Glass ampoules & test tubes',
      'Microscope slides & cover slips',
      'Orthopedic metal body implants',
      'Broken laboratory glass'
    ],
    containerType: 'Puncture-proof blue cardboard boxes or rigid blue plastic bins',
    treatmentMethod: 'Disinfection (1% Sodium Hypochlorite) followed by Autoclaving & specialized Glass Recycling',
    prohibitedItems: ['Sharps/needles', 'Human organs', 'Plastic tubing'],
    complianceRule: 'Glass containers must be handled with heavy nitrile protective gloves.'
  }
};
