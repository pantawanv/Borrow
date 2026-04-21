const db = require("../models");
const ItemPickupTime = db.itemPickupTimes;

// Create and Save a new ItemPickupTime
exports.create = async (req, res) => {
    try {
        if (!req.body.itemId || !req.body.pickupTimeId) {
            return res.status(400).send({
                message: "Item ID and Pickup Time ID can not be empty!"
            });
        }

        const itemPickupTime = await ItemPickupTime.create({
            itemId: req.body.itemId,
            pickupTimeId: req.body.pickupTimeId
        });

        res.send(itemPickupTime);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error creating item pickup time"
        });
    }
};

// Retrieve all ItemPickupTimes
exports.findAll = async (req, res) => {
    try {
        const itemPickupTimes = await ItemPickupTime.findAll();
        res.send(itemPickupTimes);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving item pickup times"
        });
    }
};  

// Find a single ItemPickupTime by id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const itemPickupTime = await ItemPickupTime.findByPk(id);

        if (!itemPickupTime) {
            return res.status(404).send({
                message: `Cannot find ItemPickupTime with id=${id}.`
            });
        }
        res.send(itemPickupTime);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving item pickup time"
        });
    }
};

// Update an ItemPickupTime by id
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await ItemPickupTime.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedItemPickupTime = await ItemPickupTime.findByPk(id);
            return res.send(updatedItemPickupTime);
        }
        throw new Error("ItemPickupTime not found");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating item pickup time with id=" + id
        });
    }   
};  

// Delete an ItemPickupTime by id
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await ItemPickupTime.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(200).send({
                message: "ItemPickupTime was deleted successfully!"
            });
        }
        throw new Error("ItemPickupTime not found");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting item pickup time with id=" + id
        });
    }   
};

// Delete all ItemPickupTimes 
exports.deleteAll = async (req, res) => {
    try {
        const deleted = await ItemPickupTime.destroy({
            where: {},
            truncate: false
        });
        res.send({ message: `${deleted} ItemPickupTimes were deleted successfully!` });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting all item pickup times"
        });
    }   
};
