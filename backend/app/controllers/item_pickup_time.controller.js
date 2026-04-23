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

        res.status(201).send(itemPickupTime);

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

// Find a single ItemPickupTime by composite key
exports.findOne = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const pickupTimeId = req.params.pickupTimeId;

        const itemPickupTime = await ItemPickupTime.findOne({
            where: {
                itemId: itemId,
                pickupTimeId: pickupTimeId
            }
        });

        if (!itemPickupTime) {
            return res.status(404).send({
                message: "ItemPickupTime not found."
            });
        }

        res.send(itemPickupTime);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving item pickup time"
        });
    }
};

// Update an ItemPickupTime by composite key
exports.update = async (req, res) => {
    const itemId = req.params.itemId;
    const pickupTimeId = req.params.pickupTimeId;

    try {
        const [updated] = await ItemPickupTime.update(req.body, {
            where: {
                itemId: itemId,
                pickupTimeId: pickupTimeId
            }
        });

        if (!updated) {
            return res.status(404).send({
                message: "ItemPickupTime not found."
            });
        }

        const updatedItemPickupTime = await ItemPickupTime.findOne({
            where: {
                itemId: itemId,
                pickupTimeId: pickupTimeId
            }
        });

        res.send(updatedItemPickupTime);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating item pickup time"
        });
    }
};

// Delete an ItemPickupTime by composite key
exports.delete = async (req, res) => {
    const itemId = req.params.itemId;
    const pickupTimeId = req.params.pickupTimeId;

    try {
        const deleted = await ItemPickupTime.destroy({
            where: {
                itemId: itemId,
                pickupTimeId: pickupTimeId
            }
        });

        if (!deleted) {
            return res.status(404).send({
                message: "ItemPickupTime not found."
            });
        }

        res.status(204).send();

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting item pickup time"
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

        res.send({
            message: `${deleted} ItemPickupTimes were deleted successfully!`
        });

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting all item pickup times"
        });
    }
};