const db = require("../models");
const Category = db.categories;

// Create and Save a new Category
exports.create = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: "Name can not be empty!"
            });
        }
    const category = await Category.create({
        name: req.body.name
    });
    res.status(201).send(category);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error creating category"
        });
    }
};

// Retrieve all Categories
exports.findAll = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.send(categories);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving categories"
        });
    }
};

// Find a single Category by id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).send({
                message: `Cannot find Category with id=${id}.`
            });
        }
        res.send(category);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving category"
        });
    }
};

// Update a Category by id 
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await Category.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedCategory = await Category.findByPk(id);
            return res.send(updatedCategory);
        }
        return res.status(404).send({
            message: `Cannot find Category with id=${id}.`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating category"
        });
    }   

};

// Delete a Category with the specified id
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Category.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.send({
                message: "Category was deleted successfully!"
            });
        }
        return res.status(404).send({
            message: `Cannot find Category with id=${id}.`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Could not delete category with id=" + id
        });
    }

};

// Delete all Categories from the database
exports.deleteAll = async (req, res) => {
    try {
        const deleted = await Category.destroy({
            where: {},
            truncate: false 
        });
        res.send({
            message: `${deleted} Categories were deleted successfully!`
        });
    }   catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all categories."
        });
    }
};
