module.exports = app => {
  const items = require("../controllers/item.controller.js");
  const router = require("express").Router();

  // Create item
  router.post("/", items.create);

  // Get all items
  router.get("/", items.findAll);

  // Get pickup relations
  router.get("/:id/pickupDays", items.getPickupDays);
  router.get("/:id/pickupTimes", items.getPickupTimes);

  // Get one item
  router.get("/:id", items.findOne);

  // Update item
  router.put("/:id", items.update);

  // Delete one
  router.delete("/:id", items.delete);

  // Delete all
  router.delete("/", items.deleteAll);

  app.use("/api/items", router);
};