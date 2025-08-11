const express = require("express")
const {getAllRestaurants} =require('../../controllers/MO_conntrollers/landingpage') 
const router = express.Router()



router.get('/getall', getAllRestaurants)


module.exports = router