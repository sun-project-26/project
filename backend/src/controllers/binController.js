const { isUsingMongo } = require('../config/db');
const SmartBin = require('../models/SmartBin');
const mockStore = require('../services/mockStore');

// GET /api/bins
const getBins = async (req, res, next) => {
  try {
    if (isUsingMongo()) {
      const bins = await SmartBin.find();
      return res.status(200).json({ success: true, count: bins.length, data: bins });
    }
    const bins = mockStore.getBins();
    res.status(200).json({ success: true, count: bins.length, data: bins });
  } catch (error) {
    next(error);
  }
};

// GET /api/bins/:id
const getBinById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isUsingMongo()) {
      const bin = await SmartBin.findOne({ $or: [{ binId: id }, { category: id.toUpperCase() }] });
      if (!bin) return res.status(404).json({ success: false, message: 'Smart Bin not found' });
      return res.status(200).json({ success: true, data: bin });
    }
    const bin = mockStore.getBinById(id);
    if (!bin) return res.status(404).json({ success: false, message: 'Smart Bin not found' });
    res.status(200).json({ success: true, data: bin });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/bins/:id
const updateBin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (isUsingMongo()) {
      const updated = await SmartBin.findOneAndUpdate(
        { $or: [{ binId: id }, { category: id.toUpperCase() }] },
        updates,
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, message: 'Smart Bin not found' });
      return res.status(200).json({ success: true, data: updated });
    }
    const updated = mockStore.updateBin(id, updates);
    if (!updated) return res.status(404).json({ success: false, message: 'Smart Bin not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBins,
  getBinById,
  updateBin
};
