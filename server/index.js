const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());
const RestDetailsRoutes = require('./routes/RestDetailsRoute')
app.use("/api/details",RestDetailsRoutes);
const landingpage = require("./routes/landingpage")
app.use("/api/landingpage",landingpage)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});












