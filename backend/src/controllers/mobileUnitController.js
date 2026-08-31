const { isUsingMongo } = require('../config/db');
const MobileUnit = require('../models/MobileUnit');
const mockStore = require('../services/mockStore');

// GET /api/mobile-units
const getMobileUnits = async (req, res, next) => {
  try {
    if (isUsingMongo()) {
      const units = await MobileUnit.find();
      return res.status(200).json({ success: true, count: units.length, data: units });
    }
    const units = mockStore.getMobileUnits();
    res.status(200).json({ success: true, count: units.length, data: units });
  } catch (error) {
    next(error);
  }
};

// GET /api/mobile-units/:id
const getMobileUnitById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isUsingMongo()) {
      const unit = await MobileUnit.findOne({ unitId: id });
      if (!unit) return res.status(404).json({ success: false, message: 'Mobile unit not found' });
      return res.status(200).json({ success: true, data: unit });
    }
    const unit = mockStore.getMobileUnitById(id);
    if (!unit) return res.status(404).json({ success: false, message: 'Mobile unit not found' });
    res.status(200).json({ success: true, data: unit });
  } catch (error) {
    next(error);
  }
};

// POST /api/mobile-units
const createMobileUnit = async (req, res, next) => {
  try {
    const unitData = req.body;
    if (isUsingMongo()) {
      const newUnit = new MobileUnit(unitData);
      await newUnit.save();
      return res.status(201).json({ success: true, data: newUnit });
    }
    const created = mockStore.updateMobileUnit(unitData.unitId, unitData) || unitData;
    mockStore.mobileUnits.push(unitData);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/mobile-units/:id
const updateMobileUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (isUsingMongo()) {
      const updated = await MobileUnit.findOneAndUpdate({ unitId: id }, updates, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Mobile unit not found' });
      return res.status(200).json({ success: true, data: updated });
    }
    const updated = mockStore.updateMobileUnit(id, updates);
    if (!updated) return res.status(404).json({ success: false, message: 'Mobile unit not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMobileUnits,
  getMobileUnitById,
  createMobileUnit,
  updateMobileUnit
};
