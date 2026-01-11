// Middleware untuk verifikasi JWT dan session aktif
const jwt = require("jsonwebtoken");
const { UserSession } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token" });

    // Verifikasi JWT
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token;

    // Cek apakah session masih aktif di DB
    const session = await UserSession.findOne({
      where: { token, isActive: true }
    });

    if (!session)
      return res.status(403).json({ message: "Session expired, please login again" });

    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
