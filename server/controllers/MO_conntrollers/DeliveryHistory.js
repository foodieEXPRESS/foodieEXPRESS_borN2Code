const prisma = require('../../database');   
const fakeData = require('../../data/fakeDeliveryData');

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================
const DEFAULT_ERROR_MESSAGE = 'Internal server error';
const DEFAULT_DRIVER_ID = 'driver-123';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Log operation details for debugging
 * @param {string} operation - Operation name
 * @param {any} data - Data to log
 */
const logOperation = (operation, data = null) => {
  console.log(`🚀 ${operation}:`, data || '');
};

/**
 * Log error details
 * @param {string} operation - Operation name
 * @param {Error} error - Error object
 */
const logError = (operation, error) => {
  console.error(`❌ Error in ${operation}:`, error);
};

/**
 * Send error response
 * @param {Response} res - Express response object
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @param {any} details - Additional error details
 */
const sendErrorResponse = (res, status, message, details = null) => {
  const response = { error: message };
  if (details) response.details = details;
  res.status(status).json(response);
};

/**
 * Validate driver ID
 * @param {string} driverId - Driver ID to validate
 * @returns {boolean} - True if valid
 */
const isValidDriverId = (driverId) => {
  return driverId && typeof driverId === 'string' && driverId.trim().length > 0;
};

// ============================================================================
// DATA PROCESSING FUNCTIONS
// ============================================================================

/**
 * Process and validate fake data
 * @param {Array} orders - Array of orders
 * @returns {Object} - Processed data with validation
 */
const processFakeData = (orders) => {
  if (!orders || !Array.isArray(orders)) {
    throw new Error('Invalid orders data structure');
  }

  return {
    totalOrders: orders.length,
    orders: orders,
    isValid: orders.length > 0
  };
};

/**
 * Get delivery statistics from orders
 * @param {Array} orders - Array of orders
 * @returns {Object} - Delivery statistics
 */
const getDeliveryStats = (orders) => {
  const stats = {
    total: orders.length,
    delivered: 0,
    cancelled: 0,
    pending: 0,
    confirmed: 0,
    preparing: 0,
    outForDelivery: 0
  };

  orders.forEach(order => {
    if (order.status) {
      stats[order.status.toLowerCase()] = (stats[order.status.toLowerCase()] || 0) + 1;
    }
  });

  return stats;
};

// ============================================================================
// MAIN CONTROLLER FUNCTIONS
// ============================================================================

/**
 * Get delivery history for a specific driver
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const getDeliveryHistory = async (req, res) => {
  try {
    // Extract and validate driver ID
    const { driverId } = req.params;
    
    if (!isValidDriverId(driverId)) {
      return sendErrorResponse(res, 400, 'Invalid driver ID provided');
    }

    // Log operation start
    logOperation('Getting delivery history for driver', driverId);
    
    // Get fake data
    const deliveryRecords = fakeData.orders;
    logOperation('Fake data contains orders', deliveryRecords.length);
    
    // Process and validate data
    const processedData = processFakeData(deliveryRecords);
    
    if (!processedData.isValid) {
      return sendErrorResponse(res, 404, 'No delivery records found');
    }

    // Get delivery statistics
    const stats = getDeliveryStats(deliveryRecords);
    logOperation('Delivery statistics', stats);
    
    // Log success
    logOperation('✅ Delivery history retrieved successfully');
    
    // Send response
    res.json({
      success: true,
      driverId: driverId,
      data: deliveryRecords,
      statistics: stats,
      totalRecords: deliveryRecords.length
    });
    
  } catch (error) {
    logError('getDeliveryHistory', error);
    sendErrorResponse(res, 500, DEFAULT_ERROR_MESSAGE, error.message);
  }
};

/**
 * Get all orders (for testing purposes)
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const getAllOrders = async (req, res) => {
  try {
    logOperation('Getting all orders from fake data');
    
    // Get and process fake data
    const deliveryRecords = fakeData.orders;
    const processedData = processFakeData(deliveryRecords);
    
    if (!processedData.isValid) {
      return sendErrorResponse(res, 404, 'No orders found');
    }

    // Get delivery statistics
    const stats = getDeliveryStats(deliveryRecords);
    logOperation('Total orders retrieved', processedData.totalOrders);
    
    // Send response
    res.json({
      success: true,
      data: {
        totalOrders: processedData.totalOrders,
        orders: processedData.orders
      },
      statistics: stats
    });
    
  } catch (error) {
    logError('getAllOrders', error);
    sendErrorResponse(res, 500, DEFAULT_ERROR_MESSAGE);
  }
};

/**
 * Get delivery summary
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const getDeliverySummary = async (req, res) => {
  try {
    logOperation('Getting delivery summary from fake data');
    
    // Validate summary data
    if (!fakeData.summary) {
      return sendErrorResponse(res, 404, 'Summary data not available');
    }

    // Send response
    res.json({
      success: true,
      data: fakeData.summary
    });
    
  } catch (error) {
    logError('getDeliverySummary', error);
    sendErrorResponse(res, 500, DEFAULT_ERROR_MESSAGE);
  }
};

// ============================================================================
// EXPORTS
// ============================================================================
module.exports = {
  getDeliveryHistory,
  getAllOrders,
  getDeliverySummary
};