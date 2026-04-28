const db = require("../models");
const Image = db.images;

// Create and Save a new Image
exports.create = async (req, res) => {
    try {
        if (!req.body.imageUrl) {
            return res.status(400).send({
                message: "Image URL can not be empty!"
            });
        }
        const image = await Image.create({
            itemId: req.body.itemId,
            imageUrl: req.body.imageUrl
        });
        res.send(image);

    } catch (err) {
        res.status(201).status(500).send({
            message: err.message || "Error creating image"
        });
    }
};

// Retrieve all Images
exports.findAll = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.send(images);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving images"
        });
    }
};

// Find a single Image by id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).send({
                message: `Cannot find Image with id=${id}.`
            });
        }
        res.send(image);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving image"
        });
    }   

};

// Update an Image by id
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        
        const [updated] = await Image.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedImage = await Image.findByPk(id);
            return res.send(updatedImage);
        }
        return res.status(404).send({
            message: `Cannot find Image with id=${id}.`
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Error updating image with id=" + id
        });
    }
};

// Delete an Image by id
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Image.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.send({
                message: "Image was deleted successfully!"
            });
        }
        return res.status(404).send({
            message: `Cannot find Image with id=${id}.`
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting image with id=" + id
        });
    }       

};

// Delete all Images by itemId
exports.deleteByItemId = async (req, res) => {
    const itemId = req.params.itemId;

    try {
        const deleted = await Image.destroy({
            where: { itemId: itemId }
        });

        res.send({
            message: `${deleted} Images deleted successfully!`
        });

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting images"
        });
    }
};

// Delete all Images
exports.deleteAll = async (req, res) => {
    try {
        const deleted = await Image.destroy({
            where: {},
            truncate: false 
        });
        res.send({
            message: `${deleted} Images were deleted successfully!`
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting all images"
        });
    }
};

