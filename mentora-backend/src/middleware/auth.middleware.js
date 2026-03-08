const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const authMiddleware = async (req, res, next) => {

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    req.user = user;

    next();

  } catch (error) {

    res.status(401).json({ error: "Invalid token" });

  }
};

module.exports = authMiddleware;