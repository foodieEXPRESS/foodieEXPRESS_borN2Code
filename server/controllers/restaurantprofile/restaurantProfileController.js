const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Restaurant Profile Management
const getRestaurantProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const restaurant = await prisma.restaurant.findFirst({
      where: { ownerId: userId },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true
          }
        },
        cuisine: true,
        media: {
          where: { type: 'image' }
        },
        _count: {
          select: {
            reviews: true,
            orders: true
          }
        }
      }
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateRestaurantProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      cuisineType,
      description,
      contactEmail,
      contactPhone,
      openingHours,
      closingHours,
      latitude,
      longitude
    } = req.body;

    const updatedRestaurant = await prisma.restaurant.update({
      where: { ownerId: userId },
      data: {
        name,
        cuisineType,
        description,
        contactEmail,
        contactPhone,
        openingHours,
        closingHours,
        latitude,
        longitude
      },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true
          }
        },
        cuisine: true
      }
    });

    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Menu Management
const getRestaurantMenus = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const menus = await prisma.menu.findMany({
      where: { 
        restaurant: {
          ownerId: userId
        }
      },
      include: {
        items: {
          include: {
            tags: {
              include: {
                tag: true
              }
            },
            media: {
              where: { type: 'image' }
            }
          }
        },
        media: {
          where: { type: 'image' }
        }
      }
    });

    res.json(menus);
  } catch (error) {
    console.error('Error fetching restaurant menus:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createMenu = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description } = req.body;

    // Get the restaurant owned by this user
    const restaurant = await prisma.restaurant.findFirst({
      where: { ownerId: userId }
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        restaurantId: restaurant.id
      },
      include: {
        items: true
      }
    });

    res.status(201).json(menu);
  } catch (error) {
    console.error('Error creating menu:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { name, description, available } = req.body;

    const menu = await prisma.menu.update({
      where: { id: menuId },
      data: {
        name,
        description,
        available
      },
      include: {
        items: true
      }
    });

    res.json(menu);
  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { menuId } = req.params;

    await prisma.menu.delete({
      where: { id: menuId }
    });

    res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get menu items
const getMenuItems = async (req, res) => {
  try {
    const { menuId } = req.params;

    const menuItems = await prisma.menuItem.findMany({
      where: { menuId },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        media: true
      }
    });

    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Menu Item Management
const createMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { name, description, price, available, tagIds } = req.body;

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        available,
        menuId,
        tags: tagIds ? {
          create: tagIds.map(tagId => ({
            tagId
          }))
        } : undefined
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        media: true
      }
    });

    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, description, price, available, tagIds } = req.body;

    // First, remove existing tags
    await prisma.itemTags.deleteMany({
      where: { itemId }
    });

    const menuItem = await prisma.menuItem.update({
      where: { id: itemId },
      data: {
        name,
        description,
        price: parseFloat(price),
        available,
        tags: tagIds ? {
          create: tagIds.map(tagId => ({
            tagId
          }))
        } : undefined
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        media: true
      }
    });

    res.json(menuItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Delete dependent relations first to satisfy FK constraints
    await prisma.$transaction([
      prisma.itemTags.deleteMany({ where: { itemId } }),
      prisma.media.deleteMany({ where: { menuItemId: itemId } }),
      prisma.menuItem.delete({ where: { id: itemId } })
    ]);

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Order Management
const getRestaurantOrders = async (req, res) => {
  try {
    // Use the same user identifier as middleware (req.user.userId)
    const userId = req.user.userId;
    const { status, page = 1, limit = 10 } = req.query;
    
    const skip = (page - 1) * limit;
    
    // Get the restaurant owned by this user
    const restaurant = await prisma.restaurant.findFirst({
      where: { ownerId: userId }
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    const whereClause = {
      restaurant: {
        some: {
          restaurantId: restaurant.id
        }
      }
    };

    if (status) {
      whereClause.status = status;
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true
          }
        },
        driver: {
          include: {
            user: {
              select: {
                fullName: true,
                phoneNumber: true
              }
            }
          }
        },
        orderItems: {
          include: {
            menu: {
              include: {
                restaurant: true
              }
            }
          }
        },
        payment: true,
        orderTracking: true
      },
      // No createdAt field in schema; order by id as a proxy for recency
      orderBy: {
        id: 'desc'
      },
      skip: parseInt(skip),
      take: parseInt(limit)
    });

    const totalOrders = await prisma.order.count({
      where: whereClause
    });

    res.json({
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalOrders,
        pages: Math.ceil(totalOrders / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching restaurant orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status against allowed transitions
    const ALLOWED_STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value', allowed: ALLOWED_STATUSES });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        orderTracking: {
          upsert: {
            create: {
              status
            },
            update: {
              status
            }
          }
        }
      },
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },
        orderItems: {
          include: {
            menu: true
          }
        },
        orderTracking: true
      }
    });

    // After status update, recompute earnings for this restaurant owner and return together
    try {
      const userId = req.user.id;
      const restaurant = await prisma.restaurant.findFirst({ where: { ownerId: userId } });
      let earnings = null;
      if (restaurant) {
        const deliveredOrders = await prisma.order.findMany({
          where: {
            restaurant: { some: { restaurantId: restaurant.id } },
            status: 'DELIVERED'
          },
          include: { payment: true }
        });
        const totalEarnings = deliveredOrders.reduce((sum, o) => sum + (o.payment?.amount || 0), 0);
        const totalOrders = deliveredOrders.length;
        const averageOrderValue = totalOrders > 0 ? totalEarnings / totalOrders : 0;
        earnings = { totalEarnings, totalOrders, averageOrderValue };
      }
      return res.json({ order, earnings });
    } catch (aggErr) {
      // If aggregation fails, still return the order
      return res.json({ order });
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Earnings & Reports
const getRestaurantEarnings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = 'week' } = req.query; // week, month, year, all

    // Get the restaurant owned by this user
    const restaurant = await prisma.restaurant.findFirst({
      where: { ownerId: userId }
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    let dateFilter = {};
    const now = new Date();

    switch (period) {
      case 'week':
        dateFilter = {
          gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        };
        break;
      case 'month':
        dateFilter = {
          gte: new Date(now.getFullYear(), now.getMonth(), 1)
        };
        break;
      case 'year':
        dateFilter = {
          gte: new Date(now.getFullYear(), 0, 1)
        };
        break;
      case 'all':
        dateFilter = {};
        break;
    }

    const orders = await prisma.order.findMany({
      where: {
        restaurant: {
          some: {
            restaurantId: restaurant.id
          }
        },
        status: 'DELIVERED',
        // removed createdAt filter to avoid schema dependency
      },
      include: {
        payment: true,
        orderItems: {
          include: {
            menu: true
          }
        }
      }
    });

    const totalEarnings = orders.reduce((sum, order) => {
      return sum + (order.payment?.amount || 0);
    }, 0);

    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalEarnings / totalOrders : 0;

    // Daily earnings (disabled due to lack of createdAt in schema)
    const dailyEarnings = [];

    res.json({
      totalEarnings,
      totalOrders,
      averageOrderValue,
      dailyEarnings,
      period
    });
  } catch (error) {
    console.error('Error fetching restaurant earnings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reviews Management
const getRestaurantReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    
    // Get the restaurant owned by this user
    const restaurant = await prisma.restaurant.findFirst({
      where: { ownerId: userId }
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    const skip = (page - 1) * limit;

    const reviews = await prisma.review.findMany({
      where: { restaurantId: restaurant.id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true
          }
        }
      },
      // No createdAt in Review model; order by id as proxy
      orderBy: {
        id: 'desc'
      },
      skip: parseInt(skip),
      take: parseInt(limit)
    });

    const totalReviews = await prisma.review.count({
      where: { restaurantId: restaurant.id }
    });

    const averageRating = await prisma.review.aggregate({
      where: { restaurantId: restaurant.id },
      _avg: {
        rating: true
      }
    });

    res.json({
      reviews,
      averageRating: averageRating._avg.rating || 0,
      totalReviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalReviews,
        pages: Math.ceil(totalReviews / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching restaurant reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Dashboard Statistics
const getRestaurantDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the restaurant owned by this user
    const restaurant = await prisma.restaurant.findFirst({
      where: { ownerId: userId }
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

    // Today's orders
    const todayOrders = await prisma.order.count({
      where: {
        restaurant: {
          some: {
            restaurantId: restaurant.id
          }
        }
      }
    });

    // Yesterday's orders
    const yesterdayOrders = 0; // removed date-based counting due to lack of createdAt

    // Today's earnings
    const todayEarnings = await prisma.order.aggregate({
      where: {
        restaurant: {
          some: {
            restaurantId: restaurant.id
          }
        },
        status: 'DELIVERED'
      },
      _sum: {
        totalAmount: true
      }
    });

    // Yesterday's earnings
    const yesterdayEarnings = { _sum: { totalAmount: 0 } }; // disabled date-based aggregation

    // Recent orders
    const recentOrders = await prisma.order.findMany({
      where: {
        restaurant: {
          some: {
            restaurantId: restaurant.id
          }
        }
      },
      include: {
        customer: {
          select: {
            fullName: true
          }
        },
        orderItems: {
          include: {
            menu: true
          }
        }
      },
      // No createdAt; order by id as a proxy
      orderBy: {
        id: 'desc'
      },
      take: 5
    });

    res.json({
      todayOrders,
      yesterdayOrders,
      todayEarnings: todayEarnings._sum.totalAmount || 0,
      yesterdayEarnings: yesterdayEarnings._sum.totalAmount || 0,
      recentOrders
    });
  } catch (error) {
    console.error('Error fetching restaurant dashboard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  // Restaurant Profile
  getRestaurantProfile,
  updateRestaurantProfile,
  
  // Menu Management
  getRestaurantMenus,
  createMenu,
  getMenuItems,
  updateMenu,
  deleteMenu,
  
  // Menu Item Management
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  
  // Order Management
  getRestaurantOrders,
  updateOrderStatus,
  
  // Earnings & Reports
  getRestaurantEarnings,
  
  // Reviews Management
  getRestaurantReviews,
  
  // Dashboard
  getRestaurantDashboard
};
