const express = require('express');
const router = express.Router();
const multer = require('multer');
const { classifyWaste, getWasteRecords, getWasteById } = require('../controllers/wasteController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/classify', upload.single('image'), classifyWaste);
router.get('/', getWasteRecords);
router.get('/:id', getWasteById);

module.exports = router;
