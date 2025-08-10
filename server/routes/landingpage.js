const express = require("express")
const {getAllRestaurants} =require('../controllers/landingpage') 
const router = express.Router()



router.get('/getall', getAllRestaurants)


module.exports = router