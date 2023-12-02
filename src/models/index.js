const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorAlias: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// define semua models yang ada pada aplikasi
db.book = require('./book.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.refreshToken = require('./refreshToken.model')(sequelize, Sequelize);

// assign relation database
db.role.hasMany(db.user, {
    foreignKey: "role",
});
db.refreshToken.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
});
db.user.hasOne(db.refreshToken, {
    foreignKey: "userId",
    targetKey: "id",
});

db.ROLES = ["user", "admin", "superadmin"];

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync(); // Sync models with the database
        console.log("Database synchronized.");
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
        throw error; // rethrow the error to be caught in server.js
    }
};

module.exports = { db, initializeDatabase };
