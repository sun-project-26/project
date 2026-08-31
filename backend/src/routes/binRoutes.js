const express = require('express');
const router = express.Router();
const { getBins, getBinById, updateBin } = require('../controllers/binController');

router.get('/', getBins);
router.get('/:id', getBinById);
router.patch('/:id', updateBin);

module.exports = router;
