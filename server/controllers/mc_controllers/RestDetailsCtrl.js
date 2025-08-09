const prisma = require("../../database");
// const restId = "8c5955c9-de47-4920-bcdd-47f05f3ce501";

const getRestbyId = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: req.params.restId
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

const getRestMediaById = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restId },
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

    const mediaUrl = restaurant.media[0]?.url || null;
    res.json({ mediaUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { getRestbyId, getRestMediaById }