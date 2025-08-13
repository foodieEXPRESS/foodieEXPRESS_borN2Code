const prisma = require("../../database");

// Controller: GET /api/search?query=...
const searchRestaurants = async (req, res) => {
  const searchQuery = String(req.query.query || '').trim();

  if (!searchQuery) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

  try {
    const results = await prisma.restaurant.findMany({
      where: {
        OR: [
          // Match menu names
          {
            menus: {
              some: {
                name: {
                  contains: searchQuery,
                },
              },
            },
          },
          // Match menu item names
          {
            menus: {
              some: {
                items: {
                  some: {
                    name: {
                      contains: searchQuery,
                    },
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        menus: {
          include: {
            items: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      query: searchQuery,
      total: results.length,
      data: results,
    });
  } catch (error) {
    console.error('❌ Search error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// export at bottom with all handlers
 
// Build list of cuisines with counts
const getCuisines = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: { cuisine: true },
    });
    const count = new Map();
    for (const r of restaurants) {
      const name = r?.cuisine?.name || 'Unknown';
      count.set(name, (count.get(name) || 0) + 1);
    }
    const data = Array.from(count.entries()).map(([name, c]) => ({
      id: name,
      name,
      restaurantCount: c,
    }));
    return res.json({ success: true, data });
  } catch (error) {
    console.error('Cuisines error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { searchRestaurants, getCuisines };