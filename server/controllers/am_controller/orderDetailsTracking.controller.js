const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get order details with all related information
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Fetch order with all related data
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            phoneNumber: true,
            address: true,
            latitude: true,
            longitude: true
          }
        },
        restaurant: {
          include: {
            restaurant: {
              select: {
                id: true,
                name: true,
                contactPhone: true,
                latitude: true,
                longitude: true
              }
            }
          }
        },
        driver: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                phoneNumber: true,
                latitude: true,
                longitude: true
              }
            }
          }
        },
        orderItems: {
          include: {
            menu: {
              include: {
                restaurant: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        },
        payment: true,
        orderTracking: true
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Transform the data to match the frontend expectations
    const transformedOrder = {
      id: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      customer: order.customer,
      restaurant: order.restaurant[0]?.restaurant, // Get the first restaurant from the array
      driver: order.driver,
      orderItems: order.orderItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        menu: item.menu
      })),
      payment: order.payment,
      orderTracking: order.orderTracking
    };

    res.json({
      success: true,
      data: transformedOrder
    });

  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get order tracking status
const getOrderTracking = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const tracking = await prisma.orderTracking.findUnique({
      where: { orderId },
      include: {
        order: {
          select: {
            id: true,
            status: true
          }
        }
      }
    });

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: 'Order tracking not found'
      });
    }

    res.json({
      success: true,
      data: tracking
    });

  } catch (error) {
    console.error('Error fetching order tracking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update order tracking status
const updateOrderTracking = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, latitude, longitude } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // Update or create order tracking
    const tracking = await prisma.orderTracking.upsert({
      where: { orderId },
      update: {
        status,
        latitude,
        longitude,
        updatedAt: new Date()
      },
      create: {
        orderId,
        status,
        latitude,
        longitude
      }
    });

    // Also update the order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    res.json({
      success: true,
      data: tracking
    });

  } catch (error) {
    console.error('Error updating order tracking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get all orders for a driver
const getDriverOrders = async (req, res) => {
  try {
    const { driverId } = req.params;

    if (!driverId) {
      return res.status(400).json({
        success: false,
        message: 'Driver ID is required'
      });
    }

    const orders = await prisma.order.findMany({
      where: { driverId },
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            phoneNumber: true,
            address: true
          }
        },
        restaurant: {
          include: {
            restaurant: {
              select: {
                id: true,
                name: true,
                contactPhone: true
              }
            }
          }
        },
        orderItems: {
          include: {
            menu: {
              include: {
                restaurant: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        },
        orderTracking: true
      }
    });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('Error fetching driver orders:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get customer information from an order
const getOrderCustomer = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            address: true,
            latitude: true,
            longitude: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: {
        orderId: order.id,
        orderStatus: order.status,
        customer: order.customer
      }
    });

  } catch (error) {
    console.error('Error fetching order customer:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get restaurant information from an order
const getOrderRestaurant = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        restaurant: {
          include: {
            restaurant: {
              select: {
                id: true,
                name: true,
                contactPhone: true,
                latitude: true,
                longitude: true,
                cuisine: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Get the first restaurant from the array (since it's a many-to-many relationship)
    const restaurantInfo = order.restaurant[0]?.restaurant;

    if (!restaurantInfo) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant information not found for this order'
      });
    }

    res.json({
      success: true,
      data: {
        orderId: order.id,
        orderStatus: order.status,
        restaurant: restaurantInfo
      }
    });

  } catch (error) {
    console.error('Error fetching order restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get all order items with quantity and price
const getOrderItems = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const orderItems = await prisma.orderItem.findMany({
      where: { orderId },
      select: {
        id: true,
        quantity: true,
        price: true,
        menu: {
          select: {
            id: true,
            name: true,
            description: true,
            items: {
              select: {
                id: true,
                name: true,
                price: true,
                description: true
              }
            }
          }
        }
      }
    });

    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No order items found for this order'
      });
    }

    // Calculate total for each item and overall total
    const itemsWithTotals = orderItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      unitPrice: item.price,
      itemTotal: item.quantity * item.price,
      menu: {
        ...item.menu,
        // Get the first menu item's price as reference (since OrderItem already has the price)
        referencePrice: item.menu.items[0]?.price || item.price
      }
    }));

    const orderTotal = itemsWithTotals.reduce((sum, item) => sum + item.itemTotal, 0);

    res.json({
      success: true,
      data: {
        orderId,
        items: itemsWithTotals,
        totalItems: orderItems.length,
        orderTotal: orderTotal
      }
    });

  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get order status
const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        orderTracking: {
          select: {
            status: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: {
        orderId: order.id,
        status: order.status,
        totalAmount: order.totalAmount,
        trackingStatus: order.orderTracking?.status || null
      }
    });

  } catch (error) {
    console.error('Error fetching order status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};





module.exports = {
  getOrderDetails,
  getOrderTracking,
  updateOrderTracking,
  getDriverOrders,
  getOrderCustomer,
  getOrderRestaurant,
  getOrderItems,
  getOrderStatus
};
