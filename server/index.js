const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());
<<<<<<< HEAD
const RestDetailsRoutes = require('./routes/RestDetailsRoute')
app.use("/api/details",RestDetailsRoutes);
=======
const router_restaurant = require("./routes/restaurant");
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
>>>>>>> d5b27085ff99e279e9b8b1198d46e57e9bfd60bc

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});












