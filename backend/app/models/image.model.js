module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        imageUrl: {
        type: DataTypes.STRING(225),
        allowNull: false
        }
      }, {
        timestamps: false,
    });

    return Image;
}