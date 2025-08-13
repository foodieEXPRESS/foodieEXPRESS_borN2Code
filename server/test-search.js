const prisma = require("./database");

async function testSearch() {
  try {
    console.log('🔍 Testing search functionality...');
    
    // Test 1: Search for "Flatley"
    console.log('\n1️⃣ Testing search for "Flatley"...');
    const searchResults1 = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            name: {
              contains: "Flatley",
            },
          },
          {
            cuisine: {
              name: {
                contains: "Flatley",
              },
            },
          },
          {
            menus: {
              some: {
                name: {
                  contains: "Flatley",
                },
              },
            },
          },
          {
            menus: {
              some: {
                items: {
                  some: {
                    name: {
                      contains: "Flatley",
                    },
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        cuisine: true,
        menus: {
          include: {
            items: true,
          },
        },
      },
    });
    
    console.log('Results for "Flatley":', searchResults1.length);
    if (searchResults1.length > 0) {
      console.log('Found restaurant:', searchResults1[0].name);
    }
    
    // Test 2: Search for "Weimann"
    console.log('\n2️⃣ Testing search for "Weimann"...');
    const searchResults2 = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            name: {
              contains: "Weimann",
            },
          },
          {
            cuisine: {
              name: {
                contains: "Weimann",
              },
            },
          },
          {
            menus: {
              some: {
                name: {
                  contains: "Weimann",
                },
              },
            },
          },
          {
            menus: {
              some: {
                items: {
                  some: {
                    name: {
                      contains: "Weimann",
                    },
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        cuisine: true,
        menus: {
          include: {
            items: true,
          },
        },
      },
    });
    
    console.log('Results for "Weimann":', searchResults2.length);
    if (searchResults2.length > 0) {
      console.log('Found restaurant:', searchResults2[0].name);
    }
    
    // Test 3: List all restaurants to see the exact names
    console.log('\n3️⃣ Listing all restaurants...');
    const allRestaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        cuisine: {
          select: {
            name: true
          }
        }
      }
    });
    
    console.log('All restaurants:');
    allRestaurants.forEach((r, i) => {
      console.log(`${i + 1}. ${r.name} (${r.cuisine?.name || 'Unknown'})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSearch();
