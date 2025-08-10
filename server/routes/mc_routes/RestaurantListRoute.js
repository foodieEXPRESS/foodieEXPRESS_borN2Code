const express = require("express")
const {getUserById,getAllRestaurants,updateUserProfile,getUserPictureById} =require('../../controllers/mc_controllers/RestaurantListCtrl') 
const router = express.Router()



router.get('/:userId', getUserById);
router.get('/', getAllRestaurants);
router.put('/:userId', updateUserProfile);
router.get('/picture/:userId', getUserPictureById);

module.exports = router;