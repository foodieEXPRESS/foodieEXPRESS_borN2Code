const prisma = require('../../database');   
const fakeData = require('../../data/fakeDeliveryData');

// جلب سجل التوصيل (يستخدم بيانات مزيفة حالياً)
const getDeliveryHistory = async (req, res) => {
  try {
    const { driverId } = req.params;
    
    console.log('🚀 Using FAKE DATA for driver:', driverId);
    console.log('📊 Fake data contains:', fakeData.orders.length, 'orders');
    
    // استخدام البيانات المزيفة بدلاً من قاعدة البيانات
    const deliveryRecords = fakeData.orders;
    
    console.log('✅ Fake data loaded successfully');
    console.log('📋 Sample record:', deliveryRecords[0]);
    
    res.json(deliveryRecords);
    
  } catch (error) {
    console.error('❌ Error in getDeliveryHistory:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
};

// جلب جميع الطلبات (يستخدم بيانات مزيفة)
const getAllOrders = async (req, res) => {
  try {
    console.log('🚀 Getting all orders from FAKE DATA...');
    
    const deliveryRecords = fakeData.orders;
    
    console.log('📊 Total fake orders:', deliveryRecords.length);
    
    res.json({
      totalOrders: deliveryRecords.length,
      orders: deliveryRecords
    });
    
  } catch (error) {
    console.error('❌ Error in getAllOrders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// جلب ملخص التوصيل (يستخدم بيانات مزيفة)
const getDeliverySummary = async (req, res) => {
  try {
    console.log('🚀 Getting delivery summary from FAKE DATA...');
    
    res.json(fakeData.summary);
    
  } catch (error) {
    console.error('❌ Error in getDeliverySummary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getDeliveryHistory,
  getAllOrders,
  getDeliverySummary
};