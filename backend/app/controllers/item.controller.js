const db = require("../models");

const Item = db.items;
const ItemPickupDay = db.itemPickupDays;
const PickupDay = db.pickupDays;

const ItemPickupTime = db.itemPickupTimes;
const PickupTime = db.pickupTimes;

// Create and Save a new Item
exports.create = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Name can not be empty!",
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
      status: req.body.status,
    });

    res.status(201).send(item);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Error creating item",
    });
  }
};

// Retrieve all Items
exports.findAll = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: db.images,
          as: "images",
        }
      ]
    });
    res.send(items);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving items",
    });
  }
};

// Find single item
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const item = await Item.findByPk(id, {
      include: [
        {
          model: db.images,
          as: "images",
        }
      ]
    });

    if (!item) {
      return res.status(404).send({
        message: `Cannot find Item with id=${id}.`,
      });
    }

    res.send(item);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving item",
    });
  }
};

// Get Pickup Days
exports.getPickupDays = async (req, res) => {
  try {
    const id = req.params.id;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).send({
        message: `Cannot find Item with id=${id}.`
      });
    }

    const pickupDays = await item.getPickupDays();

    res.send(pickupDays);

  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Error retrieving pickup days"
    });
  }
};

// Get Pickup Times
exports.getPickupTimes = async (req, res) => {
  try {
    const id = req.params.id;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).send({
        message: `Cannot find Item with id=${id}.`
      });
    }

    const pickupTimes = await item.getPickupTimes();

    res.send(pickupTimes);

  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Error retrieving pickup times"
    });
  }
};

// Update Item
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).send({
        message: `Cannot find Item with id=${id}.`
      });
    }

    await item.update(req.body);

    return res.status(200).send(item);

  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error updating item"
    });
  }
};

// Delete Item
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    // remove pickup day relations
    await db.itemPickupDays.destroy({
      where: { itemId: id }
    });

    // remove pickup time relations
    await db.itemPickupTimes.destroy({
      where: { itemId: id }
    });

    // remove images
    await db.images.destroy({
      where: { itemId: id }
    });

    // remove loans (if any)
    await db.loans.destroy({
      where: { itemId: id }
    });

    // now delete item
    const deleted = await Item.destroy({
      where: { id: id }
    });

    if (!deleted) {
      return res.status(404).send({
        message: `Cannot find Item with id=${id}.`
      });
    }

    return res.status(200).send({
      message: "Item deleted successfully"
    });

  } catch (err) {
    console.error(err);

    return res.status(500).send({
      message: err.message
    });
  }
};

//Delete pickup day relation
exports.deletePickupDays = async (req, res) => {
  try {
    await db.itemPickupDays.destroy({
      where: { itemId: req.params.id }
    });

    res.send({ message: "Pickup days deleted" });

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

//Delete pickup time relation
exports.deletePickupTimes = async (req, res) => {
  try {
    await db.itemPickupTimes.destroy({
      where: { itemId: req.params.id }
    });

    res.send({ message: "Pickup times deleted" });

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

// Delete all
exports.deleteAll = async (req, res) => {
  try {
    const deleted = await Item.destroy({
      where: {},
      truncate: false,
    });

    res.status(204).send({
      message: `${deleted} Items were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error deleting all items",
    });
  }

  // Delete all images by itemId
exports.deleteByItemId = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const deleted = await Image.destroy({
      where: { itemId: itemId }
    });

    return res.send({
      message: `${deleted} images deleted successfully`
    });

  } catch (err) {
    res.status(500).send({
      message: err.message || "Error deleting images"
    });
  }
};
};