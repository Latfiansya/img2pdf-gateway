const cron = require("node-cron");
const { UserSession } = require("../models");
const { Op } = require("sequelize");

// Jadwalkan pembersihan setiap hari pada tengah malam
cron.schedule("0 0 * * *", async () => { // setiap hari pukul 00:00
    await UserSession.destroy({ // hapus sesi yang tidak aktif lebih dari 7 hari
        where: { 
        isActive: false, 
        createdAt: {
            [Op.lt]: new Date(Date.now() - 7*24*60*60*1000) // 7 hari yang lalu
        }
        }
    });
    console.log("Old sessions cleaned");
});
