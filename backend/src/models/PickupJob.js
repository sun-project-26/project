const mongoose = require('mongoose');

const PickupJobSchema = new mongoose.Schema(
  {
    pickupId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    facility: {
      type: String,
      required: true
    },
    wasteCategory: {
      type: String,
      required: true,
      enum: ['YELLOW', 'RED', 'WHITE', 'BLUE', 'MIXED']
    },
    weight: {
      type: Number,
      required: true,
      min: 0.1
    },
    priority: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low'],
      default: 'Medium'
    },
    assignedUnit: {
      type: String,
      default: 'Unassigned'
    },
    status: {
      type: String,
      enum: ['Pending', 'Assigned', 'En Route', 'Collecting', 'Completed'],
      default: 'Pending'
    },
    pickupNotes: {
      type: String,
      default: ''
    },
    latitude: {
      type: Number,
      default: 28.6139
    },
    longitude: {
      type: Number,
      default: 77.2090
    },
    scheduledTime: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PickupJob', PickupJobSchema);
