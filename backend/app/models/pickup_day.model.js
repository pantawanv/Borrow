module.exports = (sequelize, DataTypes) => {
    const pickupDay = sequelize.define("pickupDay", {
        name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
        }
  }, {
        timestamps: false,
    });

    return pickupDay;
}