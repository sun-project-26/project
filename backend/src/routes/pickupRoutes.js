const express = require('express');
const router = express.Router();
const { getPickups, getPickupById, createPickup, updatePickupStatus } = require('../controllers/pickupController');
const { validatePickup } = require('../middleware/validator');

router.get('/', getPickups);
router.get('/:id', getPickupById);
router.post('/', validatePickup, createPickup);
router.patch('/:id/status', updatePickupStatus);

module.exports = router;
