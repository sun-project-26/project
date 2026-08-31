const mongoose = require('mongoose');

const WasteRecordSchema = new mongoose.Schema(
  {
    wasteId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    imageHash: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: true,
      enum: ['YELLOW', 'RED', 'WHITE', 'BLUE']
    },
    label: {
      type: String,
      required: true
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },
    recommendedBin: {
      type: String,
      required: true,
      enum: ['YELLOW', 'RED', 'WHITE', 'BLUE']
    },
    facility: {
      type: String,
      default: 'Apollo City Hospital - Main Ward'
    },
    reviewRequired: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['CLASSIFIED', 'BINNED', 'PICKUP_REQUESTED', 'COLLECTED', 'DISPOSED'],
      default: 'CLASSIFIED'
    },
    hazardClass: {
      type: String,
      default: 'Biomedical Hazard'
    },
    treatmentMethod: {
      type: String,
      default: 'Incineration / Autoclaving'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('WasteRecord', WasteRecordSchema);
