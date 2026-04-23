module.exports = (sequelize, DataTypes) => {
    const ItemPickupTime = sequelize.define("itemPickupTime", {
        itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        pickupTimeId: {
        type: DataTypes.INTEGER,
        allowNull: false
        }

   }, {
        timestamps: false,
        tableName: "item_pickup_time"
    });

    return ItemPickupTime;

};