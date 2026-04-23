module.exports = app => {

    const itemPickupDays = require("../controllers/item_pickup_day.controller.js");
    const router = require("express").Router();

    router.post("/", itemPickupDays.create);

    router.get("/", itemPickupDays.findAll);

    router.get("/:itemId/:pickupDayId", itemPickupDays.findOne);

    router.put("/:itemId/:pickupDayId", itemPickupDays.update);

    router.delete("/:itemId/:pickupDayId", itemPickupDays.delete);

    router.delete("/", itemPickupDays.deleteAll);

    app.use("/api/itemPickupDays", router);
}