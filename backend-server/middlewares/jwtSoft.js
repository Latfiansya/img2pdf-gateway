const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) return res.status(401).json({ message: "No token" });

        const token = auth.split(" ")[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        req.token = token;
        next();
    } catch {
        return res.status(403).json({ message: "Invalid token" });
    }
};
