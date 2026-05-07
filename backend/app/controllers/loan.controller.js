const db = require("../models");
const Loan = db.loans;

// Create and Save a new Loan
exports.create = async (req, res) => {
    try {  
        if (
            !req.body.itemId ||
            !req.body.borrowerUserId||
            !req.body.requestedDuration ||
            !req.body.requestedPickupDayId ||
            !req.body.requestedPickupTimeId ||
            !req.body.message
        ) {    
            return res.status(400).send({
                message: "Required fields cannot be empty!"
            });
        }   
        const loan = await Loan.create({
            itemId: req.body.itemId,
            borrowerUserId: req.body.borrowerUserId,
            requestedDuration: req.body.requestedDuration,
            requestedPickupDayId: req.body.requestedPickupDayId,
            requestedPickupTimeId: req.body.requestedPickupTimeId,
            message: req.body.message,
            requestDate: new Date(),
            approvedReturnDate: req.body.approvedReturnDate || null,
            actualReturnDate: req.body.actualReturnDate || null,
            status: req.body.status || 'Anmodet'

        });
        res.status(201).send(loan);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error creating loan"
        });
    }
};

// Retrieve all Loans
exports.findAll = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            include: [
                {
                    model: db.items,
                    as: "item",
                }, 
                {
                    model: db.users,
                    as: "borrower",
                }, 
                {
                    model: db.pickupDays,
                    as: "requestedPickupDay"
                },
                {
                    model: db.pickupTimes,
                    as: "requestedPickupTime"
                }
            ]
        });
        res.send(loans);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving loans"
        });
    }
};

// Find a single Loan by id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const loan = await Loan.findByPk(id, {
            include: [
                {
                    model: db.items,
                    as: "item",
                }, 
                {
                    model: db.users,
                    as: "borrower",
                }, 
                {
                    model: db.pickupDays,
                    as: "requestedPickupDay"
                },
                {
                    model: db.pickupTimes,
                    as: "requestedPickupTime"
                }
            ]
        });

        if (!loan) {
            return res.status(404).send({
                message: `Cannot find Loan with id=${id}.`
            });
        }
        res.send(loan);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving loan"
        });
    }
};


// Update a Loan by id
exports.update = async (req, res) => {
    const id = req.params.id;
    try {   
        const [updated] = await Loan.update(req.body, {
            where: { id: id }
        }); 
        if (updated) {
            const updatedLoan = await Loan.findByPk(id);
            return res.send(updatedLoan);
        }
        return res.status(404).send({
            message: `Cannot find Loan with id=${id}.`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating loan with id=" + id
        });
    }
};

// Delete a Loan by id
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Loan.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.send({
                message: "Loan was deleted successfully!"
            });
        }
        return res.status(404).send({
            message: `Cannot find Loan with id=${id}.`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting loan with id=" + id
        });
    }
};

// Delete all Loans
exports.deleteAll = async (req, res) => {
    try {
        const deleted = await Loan.destroy({
            where: {},
            truncate: false
        });
        res.send({ message: `${deleted} Loans were deleted successfully!` });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting all loans"
        });
    }   

};

