const express = require("express")
const {getRestbyId ,getRestMediaById} =require('../mc_controllers/RestDetailsCtrl') 
const router = express.Router()



router.get('/:restId',getRestbyId)
router.get('/image/:restId', getRestMediaById);

module.exports = router