const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to check if user is the owner of the restaurant
const checkRestaurantOwnership = async (req, res, next) => {
  try {
    const userId = req.user.userId; // From auth middleware

    // Check if user is a restaurant owner
    if (req.user.role !== 'RESTAURANT') {
      return res.status(403).json({ 
        message: 'Access denied. Only restaurant owners can perform this action.' 
      });
    }

    // Check if the restaurant belongs to the authenticated user
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        ownerId: userId
      }
    });

    if (!restaurant) {
      return res.status(403).json({ 
        message: 'Access denied. You can only access your own restaurant data.' 
      });
    }

    // Add restaurant to request object for use in controllers
    req.restaurant = restaurant;
    next();
  } catch (error) {
    console.error('Error in restaurant ownership check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to check if user can access menu (must be restaurant owner)
const checkMenuAccess = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const userId = req.user.userId;

    if (req.user.role !== 'RESTAURANT') {
      return res.status(403).json({ 
        message: 'Access denied. Only restaurant owners can perform this action.' 
      });
    }

    const menu = await prisma.menu.findFirst({
      where: {
        id: menuId,
        restaurant: {
          ownerId: userId
        }
      },
      include: {
        restaurant: true
      }
    });

    if (!menu) {
      return res.status(403).json({ 
        message: 'Access denied. You can only access menus from your own restaurant.' 
      });
    }

    req.menu = menu;
    next();
  } catch (error) {
    console.error('Error in menu access check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to check if user can access menu item (must be restaurant owner)
const checkMenuItemAccess = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.userId;

    if (req.user.role !== 'RESTAURANT') {
      return res.status(403).json({ 
        message: 'Access denied. Only restaurant owners can perform this action.' 
      });
    }

    const menuItem = await prisma.menuItem.findFirst({
      where: {
        id: itemId,
        menu: {
          restaurant: {
            ownerId: userId
          }
        }
      },
      include: {
        menu: {
          include: {
            restaurant: true
          }
        }
      }
    });

    if (!menuItem) {
      return res.status(403).json({ 
        message: 'Access denied. You can only access menu items from your own restaurant.' 
      });
    }

    req.menuItem = menuItem;
    next();
  } catch (error) {
    console.error('Error in menu item access check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to check if user can access order (must be restaurant owner)
const checkOrderAccess = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    if (req.user.role !== 'RESTAURANT') {
      return res.status(403).json({ 
        message: 'Access denied. Only restaurant owners can perform this action.' 
      });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        restaurant: {
          some: {
            restaurant: {
              ownerId: userId
            }
          }
        }
      },
      include: {
        restaurant: {
          include: {
            restaurant: true
          }
        }
      }
    });

    if (!order) {
      return res.status(403).json({ 
        message: 'Access denied. You can only access orders from your own restaurant.' 
      });
    }

    req.order = order;
    next();
  } catch (error) {
    console.error('Error in order access check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to check if user can access media (must be restaurant owner)
const checkMediaAccess = async (req, res, next) => {
  try {
    const { mediaId } = req.params;
    const userId = req.user.userId;

    if (req.user.role !== 'RESTAURANT') {
      return res.status(403).json({ 
        message: 'Access denied. Only restaurant owners can perform this action.' 
      });
    }

    const media = await prisma.media.findFirst({
      where: {
        id: mediaId,
        OR: [
          {
            restaurant: {
              ownerId: userId
            }
          },
          {
            menu: {
              restaurant: {
                ownerId: userId
              }
            }
          },
          {
            menuItem: {
              menu: {
                restaurant: {
                  ownerId: userId
                }
              }
            }
          }
        ]
      }
    });

    if (!media) {
      return res.status(403).json({ 
        message: 'Access denied. You can only access media from your own restaurant.' 
      });
    }

    req.media = media;
    next();
  } catch (error) {
    console.error('Error in media access check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  checkRestaurantOwnership,
  checkMenuAccess,
  checkMenuItemAccess,
  checkOrderAccess,
  checkMediaAccess
};
