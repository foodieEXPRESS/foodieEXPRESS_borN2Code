const express = require('express');
// Ensure CommonJS import (no TypeScript/ESM syntax)
const controller = require('../../controllers/MO_conntrollers/searchquerycontroller');

const router = express.Router();

// GET /api/search?query=something
router.get('/', controller.searchRestaurants);

// GET /api/search/cuisines
router.get('/cuisines', controller.getCuisines);

// GET /api/search/names -> restaurants, cuisines, items
if (controller.getNames) {
  router.get('/names', controller.getNames);
}

module.exports = router;
