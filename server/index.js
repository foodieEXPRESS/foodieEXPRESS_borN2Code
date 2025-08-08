const express = require("express");
const cors = require("cors");
const PORT = 8080;
const prisma = require("./database");
const app = express();
app.use(express.json());
app.use(cors());
const RestDetailsRoutes = require('./routes/RestDetailsRoute')
app.use("/api/details",RestDetailsRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});












