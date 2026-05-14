module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
    firebaseUid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
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
        tableName: "user"
    });

    return User;
}