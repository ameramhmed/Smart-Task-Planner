const { readDb } = require("../utils/fileDb");
const { verifyToken, publicUser } = require("../utils/auth");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login again.",
    });
  }

  const db = readDb();
  const user = db.users.find((item) => item.id === decoded.sub);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User account not found.",
    });
  }

  req.user = publicUser(user);
  next();
}

module.exports = authMiddleware;
