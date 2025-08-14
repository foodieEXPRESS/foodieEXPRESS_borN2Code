const prisma = require("../../database");
// const restId = "8c5955c9-de47-4920-bcdd-47f05f3ce501"; // mc : not needed anymore
// const userId = "9db4809c-ae36-4562-ba94-0bb74ca1007f";

const getRestbyId = async (req, res) => {
  const restId = req.params.restId;
     try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restId },
      include: {
        menus: {
          include: {
           
            items: {
              include: {
   
                tags: {
                  include: { tag: true },
                },
                media: true,
              },
            },
            media: true,
          },
        },
        media: true, 
     
        reviews: {
          include: {
            user: {
              select: { id: true, fullName: true},
            },
          },
        },
      },
    });
                    
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const getImageById = async (req, res) => {
  const restId = req.params.restId
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { 
        id: restId,
      },
      include: {
        media: {
          where: { type: 'image' },
          take: 1
        }
      }
    });
    

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const mediaUrl = restaurant.media[0]?.url
    res.json({ mediaUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const menuItemIdImage = async (req, res) => {
  const menuItemId = req.params.menuItemId;
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
      include: {
        media: true,
      },
    });

    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    const mediaUrls = menuItem.media.map(m => m.url);
    res.json({ mediaUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrderHistoryByUser = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(400).json({ success: false, error: "User ID required" });
    }

    const orders = await prisma.order.findMany({
      where: {
        customerId: userId,
        status: { in: ["DELIVERED", "CANCELLED"] },
      },
      select: {
        id: true,
        status: true,
        totalAmount: true, // use this
        driverId: true,
        orderItems: {
          select: {
            quantity: true,
            menu: {
              select: {
                id: true,
                name: true,
                restaurant: { select: { name: true } },
              }
            }
          }
        }
      },
      orderBy: { id: "desc" }
    });

    const mappedOrders = orders.flatMap(order => {
      const itemsByRestaurant = order.orderItems.reduce((acc, item) => {
        const restName = item.menu?.restaurant?.name ?? 'Unknown';
        if (!acc[restName]) acc[restName] = [];
        acc[restName].push({
          name: item.menu?.name ?? 'Unknown',
          quantity: item.quantity
        });
        return acc;
      }, {});

      return Object.entries(itemsByRestaurant).map(([restaurantName, items]) => ({
        id: order.id,
        status: order.status,
        driverId: order.driverId || null,
        restaurantName,
        items,
        totalAmount: order.totalAmount ?? 0 
      }));
    });

    res.json({
      success: true,
      totalOrders: mappedOrders.length,
      orders: mappedOrders,
    });

  } catch (error) {
    console.error("Error in getOrderHistoryByUser:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
    });
  }
};



const addRestaurantReview = async (req, res) => {
  try {
    const restId = req.params.restId;
    const { rating, comment } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!rating || rating < 0 || rating > 5)
      return res.status(400).json({ error: "Rating must be between 0 and 5" });

    const existingReview = await prisma.review.findFirst({
      where: { userId, restaurantId: restId }
    });

    let review;
    if (existingReview) {
      review = await prisma.review.update({
        where: { id: existingReview.id },
        data: { rating, comment },
        include: { user: { select: { id: true, fullName: true } } }
      });
    } else {
      review = await prisma.review.create({
        data: { userId, restaurantId: restId, rating, comment },
        include: { user: { select: { id: true, fullName: true } } }
      });
    }

    return res.status(200).json({ success: true, review });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getRestbyId, getImageById ,menuItemIdImage, getOrderHistoryByUser, addRestaurantReview }