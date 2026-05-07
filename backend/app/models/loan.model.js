module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define("loan", {
        itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        borrowerUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        requestedDuration: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        requestedPickupDayId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        requestedPickupTimeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
        type: DataTypes.TEXT,
        allowNull: false
        },
        requestDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
        },
        approvedReturnDate: {
        type: DataTypes.DATE,
        allowNull: true
        },
        actualReturnDate: {
        type: DataTypes.DATE,
        allowNull: true
        },
        status: {
        type: DataTypes.ENUM('Anmodet', 'Godkendt', 'Afvist', 'Returneret', 'Annulleret'),
        allowNull: false,
        defaultValue: 'Anmodet'
        }
    }, {
        timestamps: false,
        tableName: "loan"
    });

    return Loan;
}