const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
const prisma = require("./database");

// Import routes
const riderProfileRoutes = require("./routes/riderProfile-am");{/* TO DELETE LATER*/}
const authRoutes = require('./routes/auth');
const orderTrackingRoute= require('./routes/am_routes/order_details_tracking')
app.use(express.json());
app.use(cors());


// const router_restaurant = require("./routes/restaurant");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/rider-profile", riderProfileRoutes);
app.use("/api/order-tracking", orderTrackingRoute);

const RestDetailsRoutes = require('./routes/mc_routes/RestDetailsRoute')
const RestaurantListRoutes = require('./routes/mc_routes/RestaurantListRoute');

app.use("/api/details",RestDetailsRoutes);
app.use("/api/restaurants", RestaurantListRoutes);


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});












