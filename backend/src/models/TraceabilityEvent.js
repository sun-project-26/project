const mongoose = require('mongoose');

const TraceabilityEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    wasteId: {
      type: String,
      required: true,
      index: true
    },
    pickupId: {
      type: String,
      default: null
    },
    stepIndex: {
      type: Number,
      default: 1
    },
    action: {
      type: String,
      required: true
    },
    actor: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    hash: {
      type: String,
      required: true
    },
    previousHash: {
      type: String,
      required: true
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TraceabilityEvent', TraceabilityEventSchema);
