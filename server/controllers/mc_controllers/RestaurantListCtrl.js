const prisma = require("../../database")
// const userId = "93b90399-f562-4b4c-9d33-d678f93a45e1" 
//  mc : temporary until using Aziz's Auth token





const getUserById = async (req,res)=> { 
  try {

    const userId = req.user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" }); 
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// const getUserPictureById = async(req,res)=> { 

//   try {
//     const userId = req.user.userId;
//      const userPic = await prisma.user.findUnique({
//       where: { id: userId },
//       include: {
//         media: {
//           where: { type: 'image' },
//           take: 1
//         }
//       }
//     });
// console.log('userPic:', userPic);
//   if (!userPic || !userPic.media || userPic.media.length === 0) {
//   return res.status(404).json({ error: "User picture not found" });
// }

//     res.json(userPic.media[0]?.url || null);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


const updateUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const profileImageFile = req.file;

  const { fullName, email, phoneNumber, address } = req.body;

  try {
    const updateProfile = { fullName,email,phoneNumber,address }
      if (profileImageFile) {
        const imageUrl = `/uploads/profile_pic/${profileImageFile.filename}`

      updateProfile.profileImage = imageUrl;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateProfile,
    });

    res.json(updatedUser);
  } catch (error) {
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





module.exports = { getUserById, getAllRestaurants ,updateUserProfile ,/*getUserPictureById,*/ updateUserLocation }