const { User, ApiKey, UserSession } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
        return res.status(400).json({ message: "All fields required" });

        // cek email
        const emailExist = await User.findOne({ where: { email } });
        if (emailExist)
        return res.status(409).json({ message: "Email already registered" });

        const hash = await bcrypt.hash(password, 10);

        await User.create({
        username,
        email,
        password: hash
        });

        res.status(201).json({ message: "Register success" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    // identifier bisa email atau username
    if (!identifier || !password)
        return res.status(400).json({ message: "Fill all fields" });

    const user = await User.findOne({
        where: {
        [Op.or]: [
            { email: identifier },
            { username: identifier }
        ]
        }
    });

    // cek user
    if (!user)
        return res.status(401).json({ message: "User not found" });
    // cek password
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
        return res.status(401).json({ message: "Password is incorrect" });

    
    const activeSession = await UserSession.findOne({
        where: { UserId: user.id, isActive: true }
    });

    if (activeSession)
        return res.status(403).json({ message: "You are still logged in." });

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRED }
    );
    
    await UserSession.create({
        token,
        UserId: user.id,
        isActive: true
    });

    res.json({ token });
};


exports.logout = async (req, res) => {
    const session = await UserSession.findOne({
        where: { UserId: req.user.id, isActive: true }
    });

    if (!session) {
        return res.status(400).json({
        message: "You are already logged out"
        });
    }

    session.isActive = false;
    await session.save();

    res.json({ message: "Logout success" });
};