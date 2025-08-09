const express = require("express")
const {getUserById,getAllRestaurants} =require('../../controllers/mc_controllers/RestaurantListCtrl') 
const router = express.Router()



router.get('/:userId', getUserById);
router.get('/', getAllRestaurants);

module.exports = router;