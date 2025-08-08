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

// Get current driver profile
router.get('/me', getDriverProfile);

// Get driver by ID
router.get('/:id', getDriverById);

// Get all drivers
router.get('/', getAllDrivers);

// Update driver details
router.put('/me/availability', updateDriverAvailability);
router.put('/me/fullname', updateDriverFullName);
router.put('/me/phonenumber', updateDriverPhoneNumber);
router.put('/me/vehicle', updateDriverVehicleInfo);

module.exports = router;
