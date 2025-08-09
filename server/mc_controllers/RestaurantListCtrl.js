const prisma = require("../database");
const userId = "4a801848-d4d7-45bf-b1dc-6bddad61037b";

const getUserById = async (req,res)=> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();

    if (!restaurants || restaurants.length === 0) {
      
      return res.status(404).json({ error: "No restaurants found" });
    }
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUserById, getAllRestaurants }