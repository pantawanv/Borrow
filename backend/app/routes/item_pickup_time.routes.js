module.exports = app => {

    const itemPickupTimes = require("../controllers/item_pickup_time.controller.js");
    const router = require("express").Router();

    router.post("/", itemPickupTimes.create);

    router.get("/", itemPickupTimes.findAll);

  router.get("/:itemId/:pickupTimeId", itemPickupTimes.findOne);

    router.put("/:itemId/:pickupTimeId", itemPickupTimes.update);

    router.delete("/:itemId/:pickupTimeId", itemPickupTimes.delete);

    router.delete("/", itemPickupTimes.deleteAll);

    app.use("/api/itemPickupTimes", router);
}