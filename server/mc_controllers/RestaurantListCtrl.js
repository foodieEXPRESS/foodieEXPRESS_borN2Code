
const getUserById = async (req,res)=> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getUserById }