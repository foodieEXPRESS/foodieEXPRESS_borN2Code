const fakeData = require('../../data/fakeDeliveryData');

/**
 * Get delivery history for a specific driver
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const getDeliveryHistory = async (req, res) => {
  try {
    const { driverId } = req.params;
    
    if (!driverId || typeof driverId !== 'string' || driverId.trim().length === 0) {
      return res.status(400).json({ error: 'Invalid driver ID provided' });
    }

    const deliveryRecords = fakeData.orders;
    
    if (!deliveryRecords || deliveryRecords.length === 0) {
      return res.status(404).json({ error: 'No delivery records found' });
    }

    const stats = {
      total: deliveryRecords.length,
      delivered: 0,
      cancelled: 0,
      pending: 0,
      confirmed: 0,
      preparing: 0,
      outForDelivery: 0
    };

    deliveryRecords.forEach(order => {
      if (order.status) {
        const status = order.status.toLowerCase();
        if (stats.hasOwnProperty(status)) {
          stats[status]++;
        }
      }
    });

    res.json({
      success: true,
      driverId: driverId,
      data: deliveryRecords,
      statistics: stats,
      totalRecords: deliveryRecords.length
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getDeliveryHistory
};