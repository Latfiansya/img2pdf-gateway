const router = require("express").Router();
const apiController = require("../controllers/apiController");
const upload = require("../middlewares/upload");
const apiKey = require("../middlewares/apiKeyMiddleware");
const jwtStrict = require("../middlewares/jwtStrict");


router.get("/ping", (req, res) => res.json({ message: "API v1 alive" }));
router.post("/generate-key", jwtStrict, apiController.generateKey);
router.post(
    "/convert-pdf",
    jwtStrict,
    apiKey,
    upload.array("images"),
    apiController.convertPdf
);

module.exports = router;
