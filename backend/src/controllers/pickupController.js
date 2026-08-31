const { isUsingMongo } = require('../config/db');
const PickupJob = require('../models/PickupJob');
const mockStore = require('../services/mockStore');

// GET /api/pickups
const getPickups = async (req, res, next) => {
  try {
    const { status, category } = req.query;
    if (isUsingMongo()) {
      const query = {};
      if (status) query.status = status;
      if (category) query.wasteCategory = category.toUpperCase();
      const pickups = await PickupJob.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: pickups.length, data: pickups });
    }
    const pickups = mockStore.getPickups({ status, category });
    res.status(200).json({ success: true, count: pickups.length, data: pickups });
  } catch (error) {
    next(error);
  }
};

// GET /api/pickups/:id
const getPickupById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isUsingMongo()) {
      const pickup = await PickupJob.findOne({ pickupId: id });
      if (!pickup) return res.status(404).json({ success: false, message: 'Pickup job not found' });
      return res.status(200).json({ success: true, data: pickup });
    }
    const pickup = mockStore.getPickupById(id);
    if (!pickup) return res.status(404).json({ success: false, message: 'Pickup job not found' });
    res.status(200).json({ success: true, data: pickup });
  } catch (error) {
    next(error);
  }
};

// POST /api/pickups
const createPickup = async (req, res, next) => {
  try {
    const pickupData = req.body;
    if (isUsingMongo()) {
      const pickupId = `PCK-${Math.floor(1000 + Math.random() * 9000)}`;
      const newJob = new PickupJob({ ...pickupData, pickupId });
      await newJob.save();
      return res.status(201).json({ success: true, data: newJob });
    }
    const created = mockStore.createPickup(pickupData);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/pickups/:id/status
const updatePickupStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, unitId } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    if (isUsingMongo()) {
      const updates = { status };
      if (unitId) updates.assignedUnit = unitId;
      if (status === 'Completed') updates.completedAt = new Date();
      const updated = await PickupJob.findOneAndUpdate({ pickupId: id }, updates, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Pickup not found' });
      return res.status(200).json({ success: true, data: updated });
    }

    const updated = mockStore.updatePickupStatus(id, status, unitId);
    if (!updated) return res.status(404).json({ success: false, message: 'Pickup not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPickups,
  getPickupById,
  createPickup,
  updatePickupStatus
};
