const prisma = require("../../database");
// const restId = "8c5955c9-de47-4920-bcdd-47f05f3ce501"; // mc : not needed anymore

const getRestbyId = async (req, res) => {
    const userId = req.user.userId
    const restId = req.params.restId
  try {
    
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restId,
        userId: userId
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
  const userId = req.user.userId
  const restId = req.params.restId
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { 
        id: restId,
        userId: userId
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


module.exports = { getRestbyId, getImageById }