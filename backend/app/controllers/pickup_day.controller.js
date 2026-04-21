const db = require("../models");
const PickupDay = db.pickupDays;

// Create and Save a new PickupDay
exports.create = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: "Pickup Day name can not be empty!"
            });
        }
        const pickupDay = await PickupDay.create({
            name: req.body.name
        });
        res.send(pickupDay);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error creating pickup day"
        });
    }
};

// Retrieve all PickupDays
exports.findAll = async (req, res) => {
    try {
        const pickupDays = await PickupDay.findAll();
        res.send(pickupDays);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving pickup days"
        });
    }
};

// Find a single PickupDay by id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const pickupDay = await PickupDay.findByPk(id);
        if (!pickupDay) {
            return res.status(404).send({
                message: `Cannot find PickupDay with id=${id}.`
            });
        }
        res.send(pickupDay);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving pickup day"
        });
    }
};


// Update a PickupDay by id
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await PickupDay.update(req.body, {
            where: { id: id }
        });
        if (updated) {  
            const updatedPickupDay = await PickupDay.findByPk(id);
            return res.send(updatedPickupDay);
        }
        throw new Error("Pickup Day not found");

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating pickup day"
        });
    }   
};

// Delete a PickupDay by id
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await PickupDay.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(200).send({
                message: "Pickup Day was deleted successfully!"
            });
        }
        throw new Error("Pickup Day not found");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting pickup day with id=" + id
        });
    }
}

// Delete all PickupDays 
exports.deleteAll = async (req, res) => {
    try {
        const deleted = await PickupDay.destroy({
            where: {},
            truncate: false
        });
        res.send({ message: `${deleted} Pickup Days were deleted successfully!` });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting all pickup days"
        });
    }
};

