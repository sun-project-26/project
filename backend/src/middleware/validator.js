const validatePickup = (req, res, next) => {
  const { facility, wasteCategory, weight } = req.body;
  if (!facility || !wasteCategory) {
    return res.status(400).json({
      success: false,
      message: 'Facility name and Waste Category are required fields.'
    });
  }

  const validCategories = ['YELLOW', 'RED', 'WHITE', 'BLUE', 'MIXED'];
  if (!validCategories.includes(wasteCategory.toUpperCase())) {
    return res.status(400).json({
      success: false,
      message: `Invalid waste category. Must be one of: ${validCategories.join(', ')}`
    });
  }

  if (weight && (isNaN(weight) || Number(weight) <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'Weight must be a positive number in kg.'
    });
  }

  next();
};

module.exports = {
  validatePickup
};
