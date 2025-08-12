  const prisma = require("../../database")
  // const userId = "93b90399-f562-4b4c-9d33-d678f93a45e1" 
  //  mc : temporary until using Aziz's Auth token


  const getUserById = async (req,res)=> { 
    try {

      const userId = req.user.userId;
      const user = await prisma.user.findUnique({
             where: { id: userId },
                include: {
        media: {
          where: { type: 'image' },
          take: 1
        }
      }
    });
    console.log(user)


      if (!user) {
        return res.status(404).json({ error: "User not found" }); 
      }

       const profileImage = user.media.length > 0 ? user.media[0].url : null;

    res.json({
      ...user,
      profileImage
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

      

  const updateUserProfile = async (req, res) => {


    try {
    const userId = req.user.userId;

     const { fullName, email, phoneNumber, address } = req.body;

     const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (address) updateData.address = address;

    let updatedMedia = null;

    if (req.file) {
      updatedMedia = await prisma.media.create({
        data: {
          url: `/uploads/${req.file.filename}`,
          type: "image",
          userId: userId,
        },
      });
    }

     const updatedUser = await prisma.user.update({
        where: { id: userId },
      data: updateData,
      include: {
        media: {
          where: { type: "image" },
          take: 1,
        },
      },
    });

    res.json({
      ...updatedUser,
      profileImage: updatedUser.media.length > 0 ? updatedUser.media[0].url : null,
      updatedMedia,
    });
  } 
   catch (error) {
      console.error(error);

      res.status(500).json({ error: "Internal server error" });
    }
  };



  const getAllRestaurants = async (req, res) => {
    try {
      const restaurants = await prisma.restaurant.findMany()

      if (!restaurants || restaurants.length === 0) {
        
        return res.status(404).json({ error: "No restaurants found" })
      }
      res.json(restaurants)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }

  const updateUserLocation = async (req, res) => {
    const userId = req.user.userId
    const { latitude, longitude } = req.body

    if (latitude == null || longitude == null) {
      return res.status(400).json({ error: "Latitude and longitude are required" })
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          latitude,
          longitude,
        },
      })

      res.json(updatedUser)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }





  module.exports = { getUserById, getAllRestaurants ,updateUserProfile , updateUserLocation }