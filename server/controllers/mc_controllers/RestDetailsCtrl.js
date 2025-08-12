const prisma = require("../../database");
// const restId = "8c5955c9-de47-4920-bcdd-47f05f3ce501"; // mc : not needed anymore

const getRestbyId = async (req, res) => {
    const restId = req.params.restId
  try {
    
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restId,
      },
      include: {
        menus: {
          include: {
            items: {
              include: {
                tags: {
                  include: {
                    tag: true
                }}}}}}}});
                    
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


const getOrderHistoryByUser = async (req, res) => {
const userId = req.user.userId;
const orders = await prisma.order.findMany({
  where: { customerId: userId },
  include: {
    orderItems: {
      include: {
        menu: {
          include: {
            restaurant: true,
          },
        },
      },
    },
    restaurant: {
      include: {
        restaurant: true,
      },
    },
  },
});
  if (!orders || orders.length === 0) {
    return res.status(404).json({ error: "No orders found" });
  }
  return res.status(200).json(orders);

};

module.exports = { getRestbyId, getImageById, getOrderHistoryByUser };