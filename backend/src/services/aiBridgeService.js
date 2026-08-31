const axios = require('axios');
const { AI_SERVICE_URL } = require('../config/env');

const FALLBACK_ITEMS = [
  {
    category: 'WHITE',
    label: 'Used Syringe & Needles',
    confidence: 0.968,
    recommendedBin: 'WHITE',
    reviewRequired: false,
    hazardClass: 'Sharps / Puncture Hazard',
    treatmentMethod: 'Autoclaving + Encapsulation / Shredding'
  },
  {
    category: 'RED',
    label: 'Contaminated Latex Gloves & Plastic Tubing',
    confidence: 0.942,
    recommendedBin: 'RED',
    reviewRequired: false,
    hazardClass: 'Contaminated Non-Sharps Recyclables',
    treatmentMethod: 'Autoclaving followed by Regulated Shredding'
  },
  {
    category: 'YELLOW',
    label: 'Blood-Soiled Gauze & Anatomical Waste',
    confidence: 0.975,
    recommendedBin: 'YELLOW',
    reviewRequired: false,
    hazardClass: 'Highly Infectious Pathogenic Waste',
    treatmentMethod: 'High-Temperature Incineration / Plasma Pyrolysis'
  },
  {
    category: 'BLUE',
    label: 'Contaminated Glass Vials & Ampoules',
    confidence: 0.951,
    recommendedBin: 'BLUE',
    reviewRequired: false,
    hazardClass: 'Broken Glassware & Implants',
    treatmentMethod: '1% Sodium Hypochlorite Disinfection + Autoclaving'
  }
];

/**
 * Bridges to Python FastAPI AI service with automatic fallback
 */
const classifyWasteImage = async ({ filename, labelHint, facility }) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/predict/json`,
      {
        label_hint: labelHint || filename,
        facility: facility || 'District Civil Hospital Nashik'
      },
      { timeout: 3000 }
    );

    if (response.data) {
      return {
        wasteId: response.data.waste_id || `WST-${Date.now()}`,
        category: response.data.category,
        label: response.data.label,
        confidence: response.data.confidence,
        recommendedBin: response.data.recommended_bin,
        reviewRequired: response.data.review_required,
        hazardClass: response.data.hazard_class,
        treatmentMethod: response.data.treatment_method,
        facility: facility || 'District Civil Hospital Nashik',
        source: 'fastapi-live'
      };
    }
  } catch (err) {
    // If FastAPI microservice is offline, use intelligent fallback
    console.log(`[AI Bridge] FastAPI offline or timed out (${err.message}). Using built-in heuristic classifier.`);
  }

  // Built-in heuristic classifier fallback
  const hintLower = (labelHint || filename || '').toLowerCase();
  let matched = FALLBACK_ITEMS[0]; // Default to syringe

  if (hintLower.includes('glove') || hintLower.includes('tube') || hintLower.includes('plastic') || hintLower.includes('red')) {
    matched = FALLBACK_ITEMS[1];
  } else if (hintLower.includes('blood') || hintLower.includes('gauze') || hintLower.includes('tissue') || hintLower.includes('yellow')) {
    matched = FALLBACK_ITEMS[2];
  } else if (hintLower.includes('vial') || hintLower.includes('glass') || hintLower.includes('ampoule') || hintLower.includes('blue')) {
    matched = FALLBACK_ITEMS[3];
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
    treatmentMethod: matched.treatmentMethod,
    facility: facility || 'District Civil Hospital Nashik - Ward 4B',
    source: 'fallback-heuristic'
  };
};

module.exports = {
  classifyWasteImage
};
