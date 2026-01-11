const { User, ApiKey } = require("../models");

// READ all users
exports.getUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: ["id", "username", "email", "role"]
    });
    res.json(users);
};

// DELETE user
exports.deleteUser = async (req, res) => {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
    };

// REVOKE API KEY
exports.revokeKey = async (req, res) => {
    await ApiKey.update(
        { isActive: false },
        { where: { id: req.params.id } }
    );
    res.json({ message: "API Key revoked" });
};
