const { isUsingMongo } = require('../config/db');
const WasteRecord = require('../models/WasteRecord');
const mockStore = require('../services/mockStore');
const { classifyWasteImage } = require('../services/aiBridgeService');

// POST /api/waste/classify
const classifyWaste = async (req, res, next) => {
  try {
    const { label, labelHint, facility } = req.body;
    const file = req.file;

    const classification = await classifyWasteImage({
      filename: file ? file.originalname : label,
      labelHint: labelHint || label,
      facility: facility || 'District Civil Hospital Nashik - Ward 4B'
    });

    if (isUsingMongo()) {
      const record = new WasteRecord(classification);
      await record.save();
    } else {
      mockStore.addWasteRecord(classification);
    }

    res.status(200).json({
      success: true,
      data: classification
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/waste
const getWasteRecords = async (req, res, next) => {
  try {
    if (isUsingMongo()) {
      const records = await WasteRecord.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: records.length, data: records });
    }
    const records = mockStore.getWasteRecords();
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    next(error);
  }
};

// GET /api/waste/:id
const getWasteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isUsingMongo()) {
      const record = await WasteRecord.findOne({ wasteId: id });
      if (!record) return res.status(404).json({ success: false, message: 'Waste record not found' });
      return res.status(200).json({ success: true, data: record });
    }
    const record = mockStore.getWasteRecords().find(r => r.wasteId === id);
    if (!record) return res.status(404).json({ success: false, message: 'Waste record not found' });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  classifyWaste,
  getWasteRecords,
  getWasteById
};
