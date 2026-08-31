const mongoose = require('mongoose');

const MobileUnitSchema = new mongoose.Schema(
  {
    unitId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    driver: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      default: '+91 98765 43210'
    },
    status: {
      type: String,
      enum: ['Available', 'En Route', 'Collecting', 'Returning', 'Maintenance'],
      default: 'Available'
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    assignedPickup: {
      type: String,
      default: null
    },
    eta: {
      type: String,
      default: 'Standby'
    },
    batteryLevel: {
      type: Number,
      default: 95
    },
    currentCapacityKg: {
      type: Number,
      default: 0
    },
    maxCapacityKg: {
      type: Number,
      default: 500
    },
    speedKmH: {
      type: Number,
      default: 0
    },
    headingDeg: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MobileUnit', MobileUnitSchema);
