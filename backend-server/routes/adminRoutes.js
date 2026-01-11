const router = require("express").Router();
const admin = require("../controllers/adminController");
const jwtStrict = require("../middlewares/jwtStrict");
const isAdmin = require("../middlewares/isAdmin");

router.get("/ping", (req, res) => {
    res.json({ message: "Admin route alive" });
});

router.get("/users", jwtStrict, isAdmin, admin.getUsers);
router.delete("/users/:id", jwtStrict, isAdmin, admin.deleteUser);
router.put("/apikey/revoke/:id", jwtStrict, isAdmin, admin.revokeKey);

module.exports = router;