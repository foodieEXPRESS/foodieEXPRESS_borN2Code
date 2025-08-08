const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get current driver profile
const getDriverProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming authentication middleware sets this

    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            media: true
          }
        },
        media: true
      }
    });

    if (!driver) {
      return res.status(404).json({ 
        success: false, 
        message: 'Driver profile not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (error) {
    console.error('Error fetching driver profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      include: {
        user: {
          include: {
            media: true
          }
        },
        media: true
      }
    });

    res.status(200).json({
      success: true,
      data: drivers
    });
  } catch (error) {
    console.error('Error fetching all drivers:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const updateDriverPhoneNumber = async (req, res) => {
  try {
    const { userId } = req.user;
    const { phoneNumber } = req.body;

        const updatedDriver = await prisma.driver.update({
            where: { userId },
            data: { phoneNumber },
            include: {
                user: {
                    include: {
                        media: true
                    }
                },
                media: true
            }
        });

        res.status(200).json({
            success: true,
            message: 'Driver phone number updated successfully',
            data: updatedDriver
        });
    } catch (error) {
        console.error('Error updating driver phone number:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}
//update driver full name
const updateDriverFullName = async (req, res) => {
  try {
    const { userId } = req.user;
    const { fullName } = req.body;

    const updatedDriver = await prisma.driver.update({
      where: { userId },
      data: { fullName },
      include: {
        user: {
          include: {
            media: true
          }
        },
        media: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Driver full name updated successfully',
      data: updatedDriver
    });
  } catch (error) {
    console.error('Error updating driver full name:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get driver by ID
const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await prisma.driver.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            media: true
          }
        },
        media: true
      }
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (error) {
    console.error('Error fetching driver by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update driver availability
const updateDriverAvailability = async (req, res) => {
  try {
    const { userId } = req.user;
    const { isAvailable } = req.body;

    const updatedDriver = await prisma.driver.update({
      where: { userId },
      data: { isAvailable },
      include: {
        user: {
          include: {
            media: true
          }
        },
        media: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Driver availability updated successfully',
      data: updatedDriver
    });
  } catch (error) {
    console.error('Error updating driver availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  getDriverProfile,
  getDriverById,
  updateDriverAvailability,
  updateDriverFullName,
  updateDriverPhoneNumber,
 getAllDrivers
};
