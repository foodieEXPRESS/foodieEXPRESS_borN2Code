const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
const prisma = require("./database");

// Import routes
const riderProfileRoutes = require("./routes/riderProfile-am");{/* TO DELETE LATER*/}
const authRoutes = require('./routes/auth');
app.use(express.json());
app.use(cors());


// const router_restaurant = require("./routes/restaurant");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/rider-profile", riderProfileRoutes);{/* TO DELETE LATER*/}


const RestDetailsRoutes = require('./routes/mc_routes/RestDetailsRoute')
const RestaurantListRoutes = require('./routes/mc_routes/RestaurantListRoute');
app.get("/:restId", async (req, res) => {
  try {
    const { restId } = req.params;
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
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const RestDetailsRoutes = require('./routes/RestDetailsRoute')
const restaurant=require('./routes/RestaurantRoute')
app.use("/api/restaurants", restaurant);
app.use("/api/details",RestDetailsRoutes);
app.use("/api/restaurants", RestaurantListRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});












