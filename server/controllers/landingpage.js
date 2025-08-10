const prisma = require("../database");

const getAllRestaurants = async (req, res) => {
    try {
      const restaurants = await prisma.restaurant.findMany({
        include: {
          cuisine: true,
          media: {
            select: { url: true }
          }
        },
        orderBy: {
          rating: 'desc' 
        }
      });
  
      res.send(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  module.exports = {getAllRestaurants}