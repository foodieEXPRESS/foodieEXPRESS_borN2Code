const express = require('express');
const router = express.Router();
const {
  getDriverProfile,
  getDriverById,
  getAllDrivers,
  updateDriverAvailability,
  updateDriverFullName,
  updateDriverPhoneNumber,
  updateDriverVehicleInfo
} = require('../controllers/riderController/rider-am.controller');
const { authenticateToken, requireDriver } = require('../middleware/auth');

// Get current driver profile
router.get('/me', authenticateToken, requireDriver, getDriverProfile);

// Get driver by ID
router.get('/:id', getDriverById);

// Get all drivers
router.get('/', getAllDrivers);

// Update driver details
router.put('/me/availability', authenticateToken, requireDriver, updateDriverAvailability);
router.put('/me/fullname', authenticateToken, requireDriver, updateDriverFullName);
router.put('/me/phonenumber', authenticateToken, requireDriver, updateDriverPhoneNumber);
router.put('/me/vehicle', authenticateToken, requireDriver, updateDriverVehicleInfo);

module.exports = router;
