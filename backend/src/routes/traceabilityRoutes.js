const express = require('express');
const router = express.Router();
const { getTraceabilityByWasteId, createTraceabilityEvent } = require('../controllers/traceabilityController');

router.get('/:id', getTraceabilityByWasteId);
router.post('/event', createTraceabilityEvent);

module.exports = router;
