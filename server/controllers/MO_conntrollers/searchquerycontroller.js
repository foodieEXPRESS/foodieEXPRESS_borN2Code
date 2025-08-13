const prisma = require("../../database");

// Controller: GET /api/search?query=...
const searchRestaurants = async (req, res) => {
  const searchQuery = String(req.query.query || '').trim();
  const cuisine = String(req.query.cuisine || '').trim();
  const openNow = String(req.query.openNow || '').trim().toLowerCase() === 'true';
  const ratingParam = req.query.rating !== undefined ? Number(req.query.rating) : undefined;
  // optional client-provided current time and timezone offset (in minutes)
  const nowParam = req.query.now ? String(req.query.now).trim() : '';
  const tzOffsetParam = req.query.tzOffset !== undefined ? Number(req.query.tzOffset) : undefined; // minutes

  // Allow cuisine-only filtering without query
  if (!searchQuery && !cuisine) {
    return res.status(400).json({ error: 'Provide at least one of: query or cuisine' });
  }

  try {
    // Build dynamic where clause
    const andClauses = [];

    if (cuisine) {
      andClauses.push({
        cuisine: {
          name: { equals: cuisine },
        },
      });
    }

    if (searchQuery) {
      andClauses.push({
        OR: [
          { name: { contains: searchQuery } },
          { cuisine: { name: { contains: searchQuery } } },
          { menus: { some: { name: { contains: searchQuery } } } },
          { menus: { some: { items: { some: { name: { contains: searchQuery } } } } } },
        ],
      });
    }

    // Filter by selected rating if provided (match floor rating == selected)
    if (typeof ratingParam === 'number' && !Number.isNaN(ratingParam)) {
      // Assuming restaurant.rating is numeric
      andClauses.push({
        AND: [
          { rating: { gte: ratingParam } },
          { rating: { lt: ratingParam + 1 } },
        ],
      });
    }

    const where = andClauses.length > 0 ? { AND: andClauses } : undefined;

    const results = await prisma.restaurant.findMany({
      where,
      include: {
        cuisine: true,
        menus: { include: { items: true } },
      },
    });

    // فلترة حسب الوقت الحالي إذا طُلب openNow (بطريقتك: مقارنة مباشرة مع وقت الإغلاق فقط)
    let finalResults = results;
    if (openNow) {
      // تحديد وقت المستخدم: now + tzOffset إن وُفرت، وإلا وقت السيرفر
      let now = new Date();
      if (nowParam) {
        const parsed = new Date(nowParam);
        if (!isNaN(parsed.getTime())) now = parsed;
      }
      let nowMinutes;
      if (typeof tzOffsetParam === 'number' && !Number.isNaN(tzOffsetParam)) {
        const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
        const clientLocalMs = utcMs - tzOffsetParam * 60000;
        const clientNow = new Date(clientLocalMs);
        nowMinutes = clientNow.getHours() * 60 + clientNow.getMinutes();
      } else {
        nowMinutes = now.getHours() * 60 + now.getMinutes();
      }

      const parseTime = (t) => {
        if (!t || typeof t !== 'string') return NaN;
        const m = t.match(/^(\d{1,2}):(\d{2})$/);
        if (!m) return NaN;
        const hh = Number(m[1]);
        const mm = Number(m[2]);
        if (isNaN(hh) || isNaN(mm)) return NaN;
        return hh * 60 + mm;
      };

      // يرجع فقط المطاعم التي وقت الإغلاق فيها أكبر من الوقت الحالي
      finalResults = results.filter((r) => {
        const closeM = parseTime(r.closingHours);
        if (isNaN(closeM)) return false;
        return nowMinutes < closeM;
      });
    }

    return res.status(200).json({
      success: true,
      query: searchQuery || null,
      cuisine: cuisine || null,
      openNow,
      total: finalResults.length,
      data: finalResults,
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

// Get only names lists (restaurants, cuisines, dishes)
const getNames = async (req, res) => {
  try {
    const [restaurants, cuisines, items] = await Promise.all([
      prisma.restaurant.findMany({ select: { id: true, name: true } }),
      prisma.cuisine.findMany({ select: { id: true, name: true } }),
      prisma.menuItem.findMany({ select: { id: true, name: true } }),
    ]);

    return res.status(200).json({
      success: true,
      restaurants,
      cuisines,
      items,
    });
  } catch (error) {
    console.error('Names error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { searchRestaurants, getCuisines, getNames };