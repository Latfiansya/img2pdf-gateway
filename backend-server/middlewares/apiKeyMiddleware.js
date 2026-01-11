// Middleware untuk validasi API keys
const { ApiKey } = require("../models");

module.exports = async (req, res, next) => {
    try {
        const publicKey = req.headers["x-public-key"];
        const privateKey = req.headers["x-private-key"];

        if (!publicKey || !privateKey) {
        return res.status(401).json({ message: "API Key missing" });
        }

        const key = await ApiKey.findOne({
        where: {
            publicKey,
            privateKey,
            isActive: true
        }
        });

        if (!key) return res.status(403).json({ message: "Invalid API Key" });

        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
