import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const userMediaLinks = [
  'https://hips.hearstapps.com/hmg-prod/images/gettyimages-492532708-copy.jpg',
  'https://variety.com/wp-content/uploads/2024/01/Dwayne-Johnson_credHuyDoan-e1705977711715.jpg?w=1000&h=667&crop=1',
  'https://variety.com/wp-content/uploads/2024/01/GettyImages-1849594759-e1704908885262.jpg?w=1024',
  'https://www.sapcenter.com/assets/img/TR_SapCenteratSanJose_0930_KEVINHART_SP_1200x630-1bc04853bd.jpg',
  'https://www.beloit.edu/live/image/gid/106/width/300/height/300/crop/1/753_524461.rev.1561394268.png'
];

const restaurantMediaLinks = [
  'https://www.onamangepourvous.tn/wp-content/uploads/2020/12/1-98.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/24/4a/36/au-coeur-de-la-medina.jpg',
  'https://s3-eu-north-1.amazonaws.com/py3.visitsweden.com/original_images/Tavolo_CMSTemplate.jpg',
  'https://media.cntraveler.com/photos/654bd5e13892537a8ded0947/16:9/w_2560%2Cc_limit/phy2023.din.oss.restaurant-lr.jpg',
  'https://www.fiesta-beach.com/wp-content/uploads/sites/234/2020/11/th_Da-Mario-1.jpg'
];

const menuMediaLinks = [
  'https://c8.alamy.com/compfr/2f9wtdw/isole-beaucoup-de-differents-menu-pizza-design-collage-2f9wtdw.jpg',
  'https://www.burgerbox.menu/images/menulist_01.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo_VyPpJSn0eMfu2KEyyMOpMEUA6TiKfwWxg&s'
];

const menuItemMediaLinks = [
  'https://img.pikbest.com/origin/10/11/34/63PpIkbEsTB8r.jpg!f305cw',
  'https://www.francine.com/wp-content/uploads/2018/09/pizza-4-saisons-832588567-1.webp',
  'https://tonton.tn/wp-content/uploads/2025/01/pizza-neptune.jpg',
  'https://media.istockphoto.com/id/117150229/photo/double-bacon-cheeseburger.jpg?s=612x612&w=0&k=20&c=t8uhCixK5x80rV6CE3PBx3POekCea2Z7Gkvonzm8_tU=',
  'https://media.istockphoto.com/id/593297080/photo/juicy-gourmet-cheeseburger.jpg?s=612x612&w=0&k=20&c=qZ17Y7cvxm03cn8sOIYWDDQqO-HPw_aQsahX4gswhVo='
];

const driverMediaLinks = [
  'https://www.vwpress.co.uk/assets/images/thumbnail/38181-VWNShot12srgb626665295.jpg',
  'https://avondhupress.ie/wp-content/uploads/2024/09/VW-Transporter-Statham344.jpg',
  'https://www.vwpress.co.uk/assets/images/thumbnail/38181-VWNShot12srgb626665295.jpg'
];

async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.orderTracking.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.restaurantOrder.deleteMany(),
    prisma.order.deleteMany(),
    prisma.itemTags.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.menuItem.deleteMany(),
    prisma.menu.deleteMany(),
    prisma.review.deleteMany(),
    prisma.media.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.creditCard.deleteMany(),
    prisma.message.deleteMany(),
    prisma.userRooms.deleteMany(),
    prisma.room.deleteMany(),
    prisma.restaurant.deleteMany(),
    prisma.cuisine.deleteMany(),
    prisma.driver.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create Cuisines
  const cuisines = await Promise.all(
    ['Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese'].map((name) =>
      prisma.cuisine.create({
        data: { name }
      })
    )
  );

  // Create Users with different roles
  const users = await Promise.all([
    // Create Customers
    ...Array(10).fill(null).map(() =>
      prisma.user.create({
        data: {
          fullName: faker.person.fullName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync("Pasword123@", 10),
          role: 'CUSTOMER',
          phoneNumber: faker.phone.number(),
          address: faker.location.streetAddress(),
          latitude: parseFloat(faker.location.latitude()),
          longitude: parseFloat(faker.location.longitude()),
        }
      })
    ),
    // Create Restaurant Owners
    ...Array(5).fill(null).map(() =>
      prisma.user.create({
        data: {
          fullName: faker.person.fullName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync("Pasword123@", 10),
          role: 'RESTAURANT',
          phoneNumber: faker.phone.number(),
          address: faker.location.streetAddress(),
          latitude: parseFloat(faker.location.latitude()),
          longitude: parseFloat(faker.location.longitude()),
        }
      })
    ),
    // Create Drivers
    ...Array(5).fill(null).map(() =>
      prisma.user.create({
        data: {
          fullName: faker.person.fullName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync("Pasword123@", 10),
          role: 'DRIVER',
          phoneNumber: faker.phone.number(),
          address: faker.location.streetAddress(),
          latitude: parseFloat(faker.location.latitude()),
          longitude: parseFloat(faker.location.longitude()),
        }
      })
    )
  ]);

  // Create Restaurants
  const restaurants = await Promise.all(
    users
      .filter(user => user.role === 'RESTAURANT')
      .map(owner =>
        prisma.restaurant.create({
          data: {
            name: faker.company.name(),
            cuisineType: faker.word.words(1),
            description: faker.company.name(),
            latitude: parseFloat(faker.location.latitude()),
            longitude: parseFloat(faker.location.longitude()),
            contactEmail: faker.internet.email(),
            contactPhone: faker.phone.number(),
            openingHours: '09:00',
            closingHours: '22:00',
            rating: parseFloat(faker.number.float({ min: 3, max: 5, precision: 0.1 })),
            ownerId: owner.id,
            cuisineId: faker.helpers.arrayElement(cuisines).id,
          }
        })
      )
  );

  // Create Drivers
  const drivers = await Promise.all(
    users
      .filter(user => user.role === 'DRIVER')
      .map(user =>
        prisma.driver.create({
          data: {
            userId: user.id,
            vehicleInfo: faker.vehicle.vehicle(),
            isAvailable: faker.datatype.boolean(),
            latitude: parseFloat(faker.location.latitude()),
            longitude: parseFloat(faker.location.longitude()),
          }
        })
      )
  );

  // Create Menus
  const menus = await Promise.all(
    restaurants.map(restaurant =>
      prisma.menu.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          restaurantId: restaurant.id,
        }
      })
    )
  );

  // Create Menu Items
  const menuItems = await Promise.all(
    menus.flatMap(menu =>
      Array(5).fill(null).map(() =>
        prisma.menuItem.create({
          data: {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            available: true,
            menuId: menu.id,
          }
        })
      )
    )
  );

  // Create Tags
  const tags = await Promise.all(
    ['Spicy', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal'].map(name =>
      prisma.tag.create({
        data: { name }
      })
    )
  );

  // Create ItemTags
  await Promise.all(
    menuItems.map(item =>
      prisma.itemTags.create({
        data: {
          itemId: item.id,
          tagId: faker.helpers.arrayElement(tags).id,
        }
      })
    )
  );

  // Create Orders
  const orders = await Promise.all(
    Array(20).fill(null).map(async () => {
      const customer = faker.helpers.arrayElement(users.filter(u => u.role === 'CUSTOMER'));
      const restaurant = faker.helpers.arrayElement(restaurants);
      const driver = faker.helpers.arrayElement(drivers);

      const order = await prisma.order.create({
        data: {
          status: faker.helpers.arrayElement(['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED']),
          totalAmount: parseFloat(faker.commerce.price({ min: 20, max: 200 })),
          customerId: customer.id,
          driverId: driver.id,
        restaurantId: restaurant.id,
        }
      });

      // Create RestaurantOrder
      await prisma.restaurantOrder.create({
        data: {
          restaurantId: restaurant.id,
          orderId: order.id,
        }
      });

      return order;
    })
  );

  // Create Order Items
  await Promise.all(
    orders.flatMap(order =>
      Array(faker.number.int({ min: 1, max: 5 })).fill(null).map(() =>
        prisma.orderItem.create({
          data: {
            orderId: order.id,
            menuId: faker.helpers.arrayElement(menus).id,
            quantity: faker.number.int({ min: 1, max: 5 }),
            price: parseFloat(faker.commerce.price()),
          }
        })
      )
    )
  );

  // Create Reviews
  await Promise.all(
    Array(30).fill(null).map(() =>
      prisma.review.create({
        data: {
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.sentence(),
          userId: faker.helpers.arrayElement(users.filter(u => u.role === 'CUSTOMER')).id,
          restaurantId: faker.helpers.arrayElement(restaurants).id,
        }
      })
    )
  );

  // Create Media for Users
  await Promise.all(
    users.map(user =>
      prisma.media.create({
        data: {
          url: faker.helpers.arrayElement(userMediaLinks),
          type: 'image',
          userId: user.id
        }
      })
    )
  );

  // Create Media for Restaurants
  await Promise.all(
    restaurants.map(restaurant =>
      prisma.media.create({
        data: {
          url: faker.helpers.arrayElement(restaurantMediaLinks),
          type: 'image',
          restaurantId: restaurant.id
        }
      })
    )
  );

  // Create Media for Menus
  await Promise.all(
    menus.map(menu =>
      prisma.media.create({
        data: {
          url: faker.helpers.arrayElement(menuMediaLinks),
          type: 'image',
          menuId: menu.id
        }
      })
    )
  );

  // Create Media for MenuItems
  await Promise.all(
    menuItems.map(item =>
      prisma.media.create({
        data: {
          url: faker.helpers.arrayElement(menuItemMediaLinks),
          type: 'image',
          menuItemId: item.id
        }
      })
    )
  );

  // Create Media for Drivers
  await Promise.all(
    drivers.map(driver =>
      prisma.media.create({
        data: {
          url: faker.helpers.arrayElement(driverMediaLinks),
          type: 'image',
          driverId: driver.id
        }
      })
    )
  );

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
