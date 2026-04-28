module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        imageUrl: {
        type: DataTypes.TEXT("long"),
        allowNull: false
        }
      }, {
        timestamps: false,
        tableName: "image"
    });

    return Image;
}