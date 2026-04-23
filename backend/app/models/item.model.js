module.exports = (sequelize, DataTypes) => {

    const Item = sequelize.define("item", {
        ownerUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        name: {
        type: DataTypes.STRING(150),
        allowNull: false
        }, 
        brand: {
        type: DataTypes.STRING(100),
        allowNull: true
        },
        itemCondition: {
            type: DataTypes.ENUM('Ny', 'Som ny', 'God', 'Rimelig', 'Slidt'),
            allowNull: false
        },
        maxBorrowDays: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        description: {
        type: DataTypes.TEXT,
        allowNull: true
        },
        extraNotes: {
        type: DataTypes.TEXT,
        allowNull: true
        },
        status: {
        type: DataTypes.ENUM('Tilgængelig', 'Udlånt', 'Reserveret', 'Inaktiv'),
        allowNull: false,
        defaultValue: 'Tilgængelig'
        }

    }, {
        timestamps: false,
        tableName: "item"
    });

    return Item;
};