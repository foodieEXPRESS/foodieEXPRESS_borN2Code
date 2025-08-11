const prisma = require("../../database")


const addPicture = async (req, res) => {

    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

      const imageUrl = `/uploads/profile-images/${req.file.filename}`;

      // mc : Save image URL to user media 

      await prisma.media.create({
        data: {
          url: imageUrl,
          type: 'image',
          userId: req.user.userId
        }
      });

      res.json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


export default addPicture;