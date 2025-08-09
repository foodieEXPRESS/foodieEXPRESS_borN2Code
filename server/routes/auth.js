const express = require('express');
const router = express.Router();
const{register,login,changePassword} = require('../controllers/authController/authController');
const { authenticateToken } = require('../middleware/auth');


// Public routes (no authentication required)
router.post('/register', register);
router.post('/login', login);

// Protected routes (authentication required)
router.put('/change-password', authenticateToken, changePassword);

module.exports = router; 