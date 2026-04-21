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
        res.send(itemPickupDay);
    }
    catch (err) {
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

// Find a single ItemPickupDay by id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const itemPickupDay = await ItemPickupDay.findByPk(id);

        if (!itemPickupDay) {
            return res.status(404).send({
                message: `Cannot find ItemPickupDay with id=${id}.`
            });
        }
        res.send(itemPickupDay);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving item pickup day"
        });
    }
};

// Update an ItemPickupDay by id
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await ItemPickupDay.update(req.body, {
            where: { id: id }
        });
        if (updated) {  
            const updatedItemPickupDay = await ItemPickupDay.findByPk(id);
            return res.status(200).send(updatedItemPickupDay);
        }
        throw new Error("ItemPickupDay not found");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating item pickup day with id=" + id
        });
    }
};

// Delete an ItemPickupDay by id
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await ItemPickupDay.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        throw new Error("ItemPickupDay not found");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting item pickup day with id=" + id
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
        res.send({ message: `${deleted} ItemPickupDays were deleted successfully!` });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting all item pickup days"
        });
    }               
};

