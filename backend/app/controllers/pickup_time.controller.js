const db = require("../models");
const PickupTime = db.pickupTimes;

// Create and Save a new PickupTime
exports.create = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: "Pickup Time name can not be empty!"
            });
        }
        const pickupTime = await PickupTime.create({
            name: req.body.name
        });
        res.status(201).send(pickupTime);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error creating pickup time"
        });
    }
}

// Retrieve all PickupTimes
exports.findAll = async (req, res) => {
    try {   
        const pickupTimes = await PickupTime.findAll();
        res.send(pickupTimes);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving pickup times"
        });
    }
};

// Find a single PickupTime by id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const pickupTime = await PickupTime.findByPk(id);
        if (!pickupTime) {
            return res.status(404).send({
                message: `Cannot find PickupTime with id=${id}.`
            });
        }
        res.send(pickupTime);
    }

    catch (err) {
        res.status(500).send({
        message: err.message || "Error retrieving pickup time"
        });
    }
};

// Update a PickupTime by id
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await PickupTime.update(req.body
        , {
            where: { id: id }
        });
        if (updated) {
            const updatedPickupTime = await PickupTime.findByPk(id);
            return res.send(updatedPickupTime);
        }
        throw new Error("Pickup Time not found");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating pickup time"
        });
    }
};

// Delete a PickupTime by id
exports.delete = async (req, res) => {
    try {        
        const id = req.params.id;
        const deleted = await PickupTime.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.send({
                message: "Pickup Time was deleted successfully!"
            });
        }
        throw new Error("Pickup Time not found");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting pickup time"
        }); 
    }
};

// Delete all PickupTimes
exports.deleteAll = async (req, res) => {
    try {
        const deleted = await PickupTime.destroy({
            where: {},
            truncate: false
        });
        res.send({ message: `${deleted} PickupTimes were deleted successfully!` });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting all pickup times"
        });
    }
};