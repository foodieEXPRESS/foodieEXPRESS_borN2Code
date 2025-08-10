const express = require("express")
const {getUserById,getAllRestaurants,updateUserProfile,getUserPictureById} =require('../../controllers/mc_controllers/RestaurantListCtrl') 
const { authenticateToken } = require('../../middleware/auth');
const router = express.Router()


router.get('/picture/:userId', authenticateToken, getUserPictureById);
router.get('/:userId',authenticateToken, getUserById);
router.get('/', authenticateToken, getAllRestaurants);
router.put('/:userId', authenticateToken, updateUserProfile);

module.exports = router;