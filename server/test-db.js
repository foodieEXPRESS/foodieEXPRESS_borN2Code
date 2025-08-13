const prisma = require("./database");

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test 1: Check if restaurant with "Flatley" exists
    console.log('\n1️⃣ Searching for restaurant with "Flatley"...');
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        name: {
          contains: "Flatley"
        }
      },
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
    
    if (restaurant) {
      console.log('✅ Found restaurant:', restaurant);
    } else {
      console.log('❌ No restaurant found with "Flatley"');
    }
    
    // Test 2: List all restaurants
    console.log('\n2️⃣ Listing all restaurants...');
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
    
    console.log(`Total restaurants: ${allRestaurants.length}`);
    console.log('All restaurants:');
    allRestaurants.forEach((r, i) => {
      console.log(`${i + 1}. ${r.name} (${r.cuisine?.name || 'Unknown'})`);
    });
    
    // Test 3: Search for specific patterns
    console.log('\n3️⃣ Searching for specific patterns...');
    const flatleyResults = allRestaurants.filter(r => 
      r.name.toLowerCase().includes('flatley') || 
      r.name.toLowerCase().includes('weimann') || 
      r.name.toLowerCase().includes('boehm')
    );
    
    if (flatleyResults.length > 0) {
      console.log('✅ Found matching restaurants:');
      flatleyResults.forEach(r => console.log(`- ${r.name}`));
    } else {
      console.log('❌ No restaurants found with Flatley, Weimann, or Boehm');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
