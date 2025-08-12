const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTestOrder() {
  try {
    const customerId = '3f45a1d2-826c-4f02-986a-95ae68f495a8';
    
    // First, let's check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: customerId }
    });

    if (!user) {
      console.log('User not found. Creating a test user first...');
      // Create a test user if it doesn't exist
      const newUser = await prisma.user.create({
        data: {
          id: customerId,
          fullName: 'Test Customer',
          email: 'testcustomer@example.com',
          password: '$2b$10$ZjCa1W4sp4MezRhKDHVZ8OA3140b6hvQNDtvpk4OPeXklwTw1CGxy', // This is the hashed password you provided
          role: 'CUSTOMER',
          phoneNumber: '+1234567890',
          address: '123 Test Street, Test City, TC 12345',
          latitude: 40.7128,
          longitude: -74.0060
        }
      });
      console.log('Test user created:', newUser.id);
    } else {
      console.log('User found:', user.fullName);
    }

    // Check if there's a restaurant to associate with
    let restaurant = await prisma.restaurant.findFirst();
    
    if (!restaurant) {
      console.log('No restaurant found. Creating a test restaurant...');
      // Create a test restaurant
      const testUser = await prisma.user.create({
        data: {
          fullName: 'Test Restaurant Owner',
          email: 'restaurant@example.com',
          password: '$2b$10$ZjCa1W4sp4MezRhKDHVZ8OA3140b6hvQNDtvpk4OPeXklwTw1CGxy',
          role: 'RESTAURANT',
          phoneNumber: '+1234567891',
          address: '456 Restaurant Ave, Food City, FC 67890',
          latitude: 40.7589,
          longitude: -73.9851
        }
      });

      restaurant = await prisma.restaurant.create({
        data: {
          name: 'Test Restaurant',
          description: 'A test restaurant for development',
          address: '456 Restaurant Ave, Food City, FC 67890',
          contactPhone: '+1234567891',
          latitude: 40.7589,
          longitude: -73.9851,
          userId: testUser.id
        }
      });
      console.log('Test restaurant created:', restaurant.id);
    } else {
      console.log('Using existing restaurant:', restaurant.name);
    }

    // Check if there's a driver to assign
    let driver = await prisma.driver.findFirst({
      include: { user: true }
    });

    if (!driver) {
      console.log('No driver found. Creating a test driver...');
      // Create a test driver
      const driverUser = await prisma.user.create({
        data: {
          fullName: 'Test Driver',
          email: 'driver@example.com',
          password: '$2b$10$ZjCa1W4sp4MezRhKDHVZ8OA3140b6hvQNDtvpk4OPeXklwTw1CGxy',
          role: 'DRIVER',
          phoneNumber: '+1234567892',
          address: '789 Driver St, Delivery City, DC 11111',
          latitude: 40.7505,
          longitude: -73.9934
        }
      });

      driver = await prisma.driver.create({
        data: {
          vehicleInfo: 'Test Vehicle - White Sedan',
          isAvailable: true,
          latitude: 40.7505,
          longitude: -73.9934,
          userId: driverUser.id
        }
      });
      console.log('Test driver created:', driver.id);
    } else {
      console.log('Using existing driver:', driver.user.fullName);
    }

    // Check if there are menu items to add to the order
    let menuItem = await prisma.menu.findFirst();

    if (!menuItem) {
      console.log('No menu items found. Creating test menu items...');
      // Create a test menu item
      menuItem = await prisma.menu.create({
        data: {
          name: 'Test Burger',
          description: 'A delicious test burger',
          price: 12.99,
          category: 'Main Course',
          restaurantId: restaurant.id
        }
      });
      console.log('Test menu item created:', menuItem.id);
    } else {
      console.log('Using existing menu item:', menuItem.name);
    }

    // Create the test order
    const order = await prisma.order.create({
      data: {
        status: 'PREPARING',
        totalAmount: 16.98, // $12.99 + $3.99 delivery fee
        customerId: customerId,
        driverId: driver.id,
        orderItems: {
          create: [
            {
              quantity: 1,
              price: 12.99,
              menuId: menuItem.id
            }
          ]
        },
        orderTracking: {
          create: {
            status: 'PREPARING',
            latitude: 40.7505,
            longitude: -73.9934
          }
        }
      },
      include: {
        customer: true,
        driver: {
          include: { user: true }
        },
        orderItems: {
          include: { menu: true }
        },
        orderTracking: true
      }
    });

    // Create the restaurant-order relationship
    await prisma.restaurantOrder.create({
      data: {
        restaurantId: restaurant.id,
        orderId: order.id
      }
    });

    console.log('✅ Test order created successfully!');
    console.log('Order ID:', order.id);
    console.log('Customer:', order.customer.fullName);
    console.log('Driver:', order.driver.user.fullName);
    console.log('Restaurant:', restaurant.name);
    console.log('Status:', order.status);
    console.log('Total Amount:', order.totalAmount);

    return order;

  } catch (error) {
    console.error('❌ Error creating test order:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createTestOrder()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
