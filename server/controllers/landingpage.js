const prisma = require("../database");

const getAllRestaurants = async (req, res) => {
    try {
      const restaurants = await prisma.restaurant.findMany({
        include: {
          cuisine: true,
        },
        orderBy: {
          rating: 'desc' 
        }
      });
  
      res.json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  module.exports = {getAllRestaurants}