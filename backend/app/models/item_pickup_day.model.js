module.exports = (sequelize, DataTypes) => {
    const ItemPickupDay = sequelize.define("itemPickupDay", {
        itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        pickupDayId: {
        type: DataTypes.INTEGER,
        allowNull: false
        }
    }, {
        timestamps: false,
        tableName: "item_pickup_day"
    });

    return ItemPickupDay;
}