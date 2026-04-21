const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize.DataTypes);
db.categories = require("./category.model.js")(sequelize, Sequelize.DataTypes);
db.pickupDays = require("./pickup_day.model.js")(sequelize, Sequelize.DataTypes);
db.pickupTimes = require("./pickup_time.model.js")(sequelize, Sequelize.DataTypes);
db.items = require("./item.model.js")(sequelize, Sequelize.DataTypes);
db.itemPickupTimes = require("./item_pickup_time.model.js")(sequelize, Sequelize.DataTypes);
db.itemPickupDays = require("./item_pickup_day.model.js")(sequelize, Sequelize.DataTypes);
db.images = require("./image.model.js")(sequelize, Sequelize.DataTypes);
db.loans = require("./loan.model.js")(sequelize, Sequelize.DataTypes);

//TODO: Define associations here

module.exports = db;