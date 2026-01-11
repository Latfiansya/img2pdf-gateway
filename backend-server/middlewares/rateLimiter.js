const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 30,                 // 30 request / 15 menit / user
    message: { message: "Too many requests. Please wait 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false
});
