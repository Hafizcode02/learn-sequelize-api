require("dotenv").config();
// Configuration DB
module.exports = {
    // HOST: process.env.DB_HOST,
    // USER: process.env.DB_USER,
    // PASSWORD: process.env.DB_PASSWORD,
    // DB: process.env.DB_DATABASE,
    // dialect: 'mysql',
    username: process.env.DB_USER, // harus pake yang kecil gini kaya di dokumentasi
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}
