const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
const prisma = require("./database");

// Import routes
const riderProfileRoutes = require("./routes/riderProfile-am");{/* TO DELETE LATER*/}
const authRoutes = require('./routes/auth');
const orderTrackingRoute= require('./routes/am_routes/order_details_tracking')
const restaurantProfileRoutes = require('./routes/restaurantprofile/restaurantProfile');
const mediaRoutes = require('./routes/restaurantprofile/media');

const RestDetailsRoutes = require('./routes/mc_routes/RestDetailsRoute')
const RestaurantListRoutes = require('./routes/mc_routes/RestaurantListRoute');
// const multerRoutes = require('./routes/mc_routes/multerRoute.js')  ;


app.use(express.json());
app.use(cors());



// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/rider-profile", riderProfileRoutes);
app.use("/api/order-tracking", orderTrackingRoute);
app.use("/api/restaurant-profile", restaurantProfileRoutes);
app.use("/api/media", mediaRoutes);

app.use("/api/restaurants", RestaurantListRoutes);
app.use("/api/rider-profile", riderProfileRoutes);{/* TO DELETE LATER*/}
const deliveryRoutes = require('./routes/MO_routes/deliveryRoutes');
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

// const restaurant=require('./routes/RestaurantRoute')
// app.use("/api/restaurants", restaurant);
app.use("/api/details",RestDetailsRoutes);
// app.use("/api/upload", multerRoutes);

const searchqueryRoutes = require('./routes/MO_routes/searchqueryRoutes')
app.use("/api/search", searchqueryRoutes);
const landingpage = require("./routes/MO_routes/landingpage")

app.use("/api/landingpage",landingpage)


app.use("/api/restaurants", RestaurantListRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});












