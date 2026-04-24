const db = require("../models");
const Item = db.items;

// Create and Save a new Item
exports.create = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: "Name can not be empty!"
            });
        }

        const item = await Item.create({
            ownerUserId: req.body.ownerUserId,
            categoryId: req.body.categoryId,
            name: req.body.name,
            brand: req.body.brand,
            itemCondition: req.body.itemCondition,
            maxBorrowDays: req.body.maxBorrowDays,
            description: req.body.description,
            extraNotes: req.body.extraNotes,
            status: req.body.status
        });
        res.status(201).send(item);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || "Error creating item"
        });
    }
};

// Retrieve all Items
exports.findAll = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.send(items);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving items"
        });
    }   
};

// Find a single Item by id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(404).send({
                message: `Cannot find Item with id=${id}.`
            });
        }
        res.send(item);

    } catch (err) {
        res.status(500).send({
            message: err.message || 
            "Error retrieving item"
        });
    }
};

// Update Item
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Item.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedItem = await Item.findByPk(id);
            return res.status(200).send(updatedItem);
        }
        return res.status(404).send({
            message: `Cannot find Item with id=${id}.`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating item with id=" + id
        });
    }               

};

// Delete Item by Id
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Item.destroy({
            where: { id: id }
        }); 
        if (deleted) {
            return res.status(204).send({
                message: "Item was deleted successfully!"
            });
        }
        return res.status(404).send({
            message: `Cannot find Item with id=${id}.`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Could not delete item with id=" + id
        });
    }
};

// Delete all Items
exports.deleteAll = async (req, res) => {
    try {
        const deleted = await Item.destroy({
            where: {},
            truncate: false
        });
        res.status(204).send({
            message: `${deleted} Items were deleted successfully!`
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting all items"
        });
    }   
};