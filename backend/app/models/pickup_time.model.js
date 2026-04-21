module.exports = (sequelize, DataTypes) => {
    const PickupTime = sequelize.define("pickupTime", {
        name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
        }
  }, {
        timestamps: false,
    });

    return PickupTime;
}