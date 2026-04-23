const db = require("../models");
const ItemPickupDay = db.itemPickupDays;

// Create and Save a new ItemPickupDay
exports.create = async (req, res) => {
    try {
        if (!req.body.itemId || !req.body.pickupDayId) {
            return res.status(400).send({
                message: "Item ID and Pickup Day ID can not be empty!"
            });
        }

        const itemPickupDay = await ItemPickupDay.create({
            itemId: req.body.itemId,
            pickupDayId: req.body.pickupDayId
        });

        res.status(201).send(itemPickupDay);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error creating item pickup day"
        });
    }
};

// Retrieve all ItemPickupDays
exports.findAll = async (req, res) => {
    try {
        const itemPickupDays = await ItemPickupDay.findAll();
        res.send(itemPickupDays);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving item pickup days"
        });
    }
};

// Find a single ItemPickupDay by composite key
exports.findOne = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const pickupDayId = req.params.pickupDayId;

        const itemPickupDay = await ItemPickupDay.findOne({
            where: {
                itemId: itemId,
                pickupDayId: pickupDayId
            }
        });

        if (!itemPickupDay) {
            return res.status(404).send({
                message: "ItemPickupDay not found."
            });
        }

        res.send(itemPickupDay);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving item pickup day"
        });
    }
};

// Update an ItemPickupDay by composite key
exports.update = async (req, res) => {
    const itemId = req.params.itemId;
    const pickupDayId = req.params.pickupDayId;

    try {
        const [updated] = await ItemPickupDay.update(req.body, {
            where: {
                itemId: itemId,
                pickupDayId: pickupDayId
            }
        });

        if (!updated) {
            return res.status(404).send({
                message: "ItemPickupDay not found."
            });
        }

        const updatedItemPickupDay = await ItemPickupDay.findOne({
            where: {
                itemId: itemId,
                pickupDayId: pickupDayId
            }
        });

        res.send(updatedItemPickupDay);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating item pickup day"
        });
    }
};

// Delete an ItemPickupDay by composite key
exports.delete = async (req, res) => {
    const itemId = req.params.itemId;
    const pickupDayId = req.params.pickupDayId;

    try {
        const deleted = await ItemPickupDay.destroy({
            where: {
                itemId: itemId,
                pickupDayId: pickupDayId
            }
        });

        if (!deleted) {
            return res.status(404).send({
                message: "ItemPickupDay not found."
            });
        }

        res.status(204).send();

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting item pickup day"
        });
    }
};

// Delete all ItemPickupDays
exports.deleteAll = async (req, res) => {
    try {
        const deleted = await ItemPickupDay.destroy({
            where: {},
            truncate: false
        });

        res.send({
            message: `${deleted} ItemPickupDays were deleted successfully!`
        });

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting all item pickup days"
        });
    }
};