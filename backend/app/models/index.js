const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.users = require("./user.model.js")(sequelize, Sequelize.DataTypes);
db.categories = require("./category.model.js")(sequelize, Sequelize.DataTypes);
db.pickupDays = require("./pickup_day.model.js")(sequelize, Sequelize.DataTypes);
db.pickupTimes = require("./pickup_time.model.js")(sequelize, Sequelize.DataTypes);
db.items = require("./item.model.js")(sequelize, Sequelize.DataTypes);
db.itemPickupDays = require("./item_pickup_day.model.js")(sequelize, Sequelize.DataTypes);
db.itemPickupTimes = require("./item_pickup_time.model.js")(sequelize, Sequelize.DataTypes);
db.images = require("./image.model.js")(sequelize, Sequelize.DataTypes);
db.loans = require("./loan.model.js")(sequelize, Sequelize.DataTypes);




//USER RELATIONSHIPS
// User owns many Items
db.users.hasMany(db.items, {
    foreignKey: "ownerUserId",
    as: "items",
    onDelete: "CASCADE"
});

// User has many Loans (borrower)
db.users.hasMany(db.loans, {
    foreignKey: "borrowerUserId",
    as: "loans",
    onDelete: "RESTRICT"
});

//ITEM RELATIONSHIPS
// Item belongs to User (owner)
db.items.belongsTo(db.users, {
    foreignKey: "ownerUserId",
    as: "owner"
});

// Item belongs to Category
db.items.belongsTo(db.categories, {
    foreignKey: "categoryId",
    as: "category"
});

// Category has many Items
db.categories.hasMany(db.items, {
    foreignKey: "categoryId",
    as: "items",
    onDelete: "SET NULL"
});

// Item has many Loans
db.items.hasMany(db.loans, {
    foreignKey: "itemId",
    as: "loans",
    onDelete: "RESTRICT"
});

// Loan belongs to Item
db.loans.belongsTo(db.items, {
    foreignKey: "itemId",
    as: "item"
});

// Loan belongs to User (borrower)
db.loans.belongsTo(db.users, {
    foreignKey: "borrowerUserId",
    as: "borrower"
});

// Item has many Images
db.items.hasMany(db.images, {
    foreignKey: "itemId",
    as: "images",
    onDelete: "CASCADE"
});

// Image belongs to Item
db.images.belongsTo(db.items, {
    foreignKey: "itemId",
    as: "item"
});


//PICKUP DAYS (many-to-many)
db.items.belongsToMany(db.pickupDays, {
    through: db.itemPickupDays,
    foreignKey: "itemId",
    otherKey: "pickupDayId",
    as: "pickupDays"
});

db.pickupDays.belongsToMany(db.items, {
    through: db.itemPickupDays,
    foreignKey: "pickupDayId",
    otherKey: "itemId",
    as: "items"
});

//PICKUP TIMES (many-to-many)
db.items.belongsToMany(db.pickupTimes, {
    through: db.itemPickupTimes,
    foreignKey: "itemId",
    otherKey: "pickupTimeId",
    as: "pickupTimes"
});

db.pickupTimes.belongsToMany(db.items, {
    through: db.itemPickupTimes,
    foreignKey: "pickupTimeId",
    otherKey: "itemId",
    as: "items"
});

module.exports = db;