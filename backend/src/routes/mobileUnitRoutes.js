const express = require('express');
const router = express.Router();
const { getMobileUnits, getMobileUnitById, createMobileUnit, updateMobileUnit } = require('../controllers/mobileUnitController');

router.get('/', getMobileUnits);
router.get('/:id', getMobileUnitById);
router.post('/', createMobileUnit);
router.patch('/:id', updateMobileUnit);

module.exports = router;
