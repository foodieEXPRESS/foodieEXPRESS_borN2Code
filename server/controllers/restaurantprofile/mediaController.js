const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload restaurant profile image
const uploadRestaurantImage = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      const userId = req.user.id;
      
      // Get the restaurant owned by this user
      const restaurant = await prisma.restaurant.findFirst({
        where: { ownerId: userId }
      });

      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      const imageUrl = `/uploads/${req.file.filename}`;

      // Save media record to database
      const media = await prisma.media.create({
        data: {
          url: imageUrl,
          type: 'image',
          restaurantId: restaurant.id
        }
      });

      res.json({
        message: 'Image uploaded successfully',
        media: media
      });
    });
  } catch (error) {
    console.error('Error uploading restaurant image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Upload menu image
const uploadMenuImage = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      const { menuId } = req.params;
      const imageUrl = `/uploads/${req.file.filename}`;

      // Save media record to database
      const media = await prisma.media.create({
        data: {
          url: imageUrl,
          type: 'image',
          menuId: menuId
        }
      });

      res.json({
        message: 'Menu image uploaded successfully',
        media: media
      });
    });
  } catch (error) {
    console.error('Error uploading menu image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Upload menu item image
const uploadMenuItemImage = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      const { itemId } = req.params;
      const imageUrl = `/uploads/${req.file.filename}`;

      // Save media record to database
      const media = await prisma.media.create({
        data: {
          url: imageUrl,
          type: 'image',
          menuItemId: itemId
        }
      });

      res.json({
        message: 'Menu item image uploaded successfully',
        media: media
      });
    });
  } catch (error) {
    console.error('Error uploading menu item image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete media
const deleteMedia = async (req, res) => {
  try {
    const { mediaId } = req.params;

    const media = await prisma.media.findUnique({
      where: { id: mediaId }
    });

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', media.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await prisma.media.delete({
      where: { id: mediaId }
    });

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get media by type and entity
const getMedia = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;

    let whereClause = {};
    switch (entityType) {
      case 'restaurant':
        whereClause.restaurantId = entityId;
        break;
      case 'menu':
        whereClause.menuId = entityId;
        break;
      case 'menuItem':
        whereClause.menuItemId = entityId;
        break;
      default:
        return res.status(400).json({ message: 'Invalid entity type' });
    }

    whereClause.type = 'image';

    const media = await prisma.media.findMany({
      where: whereClause,
      orderBy: {
        uploadedAt: 'desc'
      }
    });

    res.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  uploadRestaurantImage,
  uploadMenuImage,
  uploadMenuItemImage,
  deleteMedia,
  getMedia,
  upload // Export multer instance for use in routes
};
