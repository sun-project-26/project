const mongoose = require('mongoose');

const SmartBinSchema = new mongoose.Schema(
  {
    binId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      enum: ['YELLOW', 'RED', 'WHITE', 'BLUE']
    },
    facility: {
      type: String,
      default: 'Apollo City Hospital'
    },
    locationTag: {
      type: String,
      default: 'Main Emergency Wing'
    },
    currentLoadKg: {
      type: Number,
      required: true,
      default: 0
    },
    maxCapacityKg: {
      type: Number,
      required: true,
      default: 500
    },
    fillPercentage: {
      type: Number,
      default: 0
    },
    itemCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Normal', 'Active', 'Near Capacity', 'Critical Full'],
      default: 'Normal'
    },
    wasteTypesIncluded: [String],
    treatmentProtocol: String,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SmartBin', SmartBinSchema);
