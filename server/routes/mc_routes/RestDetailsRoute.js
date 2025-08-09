const express = require("express")
const {getRestbyId,getImageById} =require('../../controllers/mc_controllers/RestDetailsCtrl') 
const router = express.Router()



router.get('/:restId',getRestbyId)
router.get('/image/:restId',getImageById)


module.exports = router