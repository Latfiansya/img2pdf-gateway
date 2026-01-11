const router = require("express").Router();
const auth = require("../controllers/authController");
const jwt = require("../middlewares/jwtStrict"); 
const jwtSoft = require("../middlewares/jwtSoft");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/logout", jwtSoft, auth.logout);

module.exports = router;
