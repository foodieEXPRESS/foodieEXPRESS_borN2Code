const express = require('express');
const router = express.Router();
const mediaController = require('../../controllers/restaurantprofile/mediaController');
const auth = require('../../middleware/auth');
const { 
  checkMenuAccess, 
  checkMenuItemAccess, 
  checkMediaAccess 
} = require('../../middleware/restaurantAuth');

// Apply authentication middleware to all routes
router.use((req, res, next) => auth.authenticateToken(req, res, next));

// Media upload routes
router.post('/restaurant', mediaController.uploadRestaurantImage);
router.post('/menu/:menuId', checkMenuAccess, mediaController.uploadMenuImage);
router.post('/menu-item/:menuId/:itemId', checkMenuItemAccess, mediaController.uploadMenuItemImage);

// Media management routes
router.get('/:entityType/:entityId', mediaController.getMedia);
router.delete('/:mediaId', checkMediaAccess, mediaController.deleteMedia);

module.exports = router;
