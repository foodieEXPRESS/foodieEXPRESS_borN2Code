const express = require("express");
const cors = require("cors");
const PORT = 8080;
const prisma = require("./database");
const app = express();
app.use(express.json());
app.use(cors());
const RestDetailsRoutes = require('./routes/mc_routes/RestDetailsRoute');
const RestaurantListRoutes = require('./routes/mc_routes/RestaurantListRoute');
app.use("/api/details",RestDetailsRoutes);
app.use("/api/restaurants", RestaurantListRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});












