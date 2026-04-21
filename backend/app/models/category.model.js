module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
        }
    }, {
        timestamps: false,
    });

    return Category;
};