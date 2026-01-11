require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log("ENV:", process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_NAME);

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false
  }
);


(async () => {
  try {
    await db.authenticate();
    console.log("✅ KONEKSI MYSQL BERHASIL");
  } catch (err) {
    console.error("❌ ERROR KONEKSI MYSQL:\n", err);
  }
})();
