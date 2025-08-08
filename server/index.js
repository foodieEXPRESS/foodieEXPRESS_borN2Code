const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
const prisma = require("./database");

// Import routes
const riderProfileRoutes = require("./routes/riderProfile");{/* TO DELETE LATER*/}

app.use(express.json());
app.use(cors());

// Use routes
app.use("/api/rider-profile", riderProfileRoutes);{/* TO DELETE LATER*/}

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

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});












