const db = require('../models');
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
    try {
        if(!req.body.firstName || !req.body.lastName) {
            return res.status(400).send({
                message: "First name and last name can not be empty!"
            });
        }

        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber
        })

        res.send(user);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Error creating user"
        });

    }

};

// Retrieve all Users
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (err) {
        res.status(500).send({
            message: err.message ||
            "Error retrieving users"
        });
    }
};


// Find a single User by id 
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (user) {
            return res.status(404).send({
                message: `Cannot find User with id=${id}.`
            });
        }
        res.send(user);

    } catch (err) {
        res.status(500).send({
            message: err.message ||
            "Error retrieving user with id=" + id
        });
    } 
};

// Update User 
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await User.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            return res.status(200).send(updatedUser);
        }
        throw new Error('User not found');
    } catch (err) {
        res.status(500).send({
            message: err.message ||
            "Error updating User with id=" + id
        });
    }   
};

// Delete User by id
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await User.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        throw new Error('User not found');
    } catch (err) {
        res.status(500).send({
            message: err.message ||
            "Could not delete User with id=" + id
        });
    }
};

// Delete all Users 
exports.deleteAll = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: {},
            truncate: false
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({
            message: err.message ||
            "Error deleting all users"
        });
    }   
};