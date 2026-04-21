module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
       firstName: {
        type: DataTypes.STRING(100),
        allowNull: false
       },
       lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
       },
        email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }     
        },
        passwordHash: {
        type: DataTypes.STRING(200),
        allowNull: false
        },
        address: {
        type: DataTypes.STRING(200),
        allowNull: false
        },
        phoneNumber: {
        type: DataTypes.STRING(30),
        allowNull: true
        }, 
    }, {
        timestamps: false,
    });

    return User;
}