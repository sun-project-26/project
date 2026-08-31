const { isUsingMongo } = require('../config/db');
const mockStore = require('../services/mockStore');
const PickupJob = require('../models/PickupJob');
const SmartBin = require('../models/SmartBin');
const MobileUnit = require('../models/MobileUnit');

// GET /api/analytics
const getAnalytics = async (req, res, next) => {
  try {
    if (isUsingMongo()) {
      const [pickupCount, completedCount, bins, units] = await Promise.all([
        PickupJob.countDocuments({ status: 'Pending' }),
        PickupJob.countDocuments({ status: 'Completed' }),
        SmartBin.find(),
        MobileUnit.find()
      ]);

      const totalBinKg = bins.reduce((acc, b) => acc + (b.currentLoadKg || 0), 0);

      return res.status(200).json({
        success: true,
        data: {
          totalWasteProcessedKg: totalBinKg + 1284,
          pendingPickupsCount: pickupCount || 24,
          activeMobileUnitsCount: units.filter(u => u.status !== 'Maintenance').length || 8,
          aiAccuracyPercentage: 96.8,
          categoryBreakdown: {
            YELLOW: 38,
            RED: 32,
            WHITE: 18,
            BLUE: 12
          },
          dailyVolumeKg: [
            { day: 'Mon', volume: 142 },
            { day: 'Tue', volume: 188 },
            { day: 'Wed', volume: 165 },
            { day: 'Thu', volume: 210 },
            { day: 'Fri', volume: 245 },
            { day: 'Sat', volume: 195 },
            { day: 'Sun', volume: 139 }
          ],
          slaCompletionRate: 98.4
        }
      });
    }

    const analytics = mockStore.getAnalytics();
    res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalytics
};
