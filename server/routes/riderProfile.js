const express = require('express');
const router = express.Router();
const {
  getDriverProfile,
  getDriverById,
  getAllDrivers,
  updateDriverAvailability,
  updateDriverFullName,
  updateDriverPhoneNumber
} = require('../controllers/riderController/rider.controller');

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

module.exports = router;
