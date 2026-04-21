module.exports = app => {

    const itemPickupDays = require("../controllers/item_pickup_day.controller.js");
    const router = require("express").Router();

    router.post("/", itemPickupDays.create);

    router.get("/", itemPickupDays.findAll);

    router.get("/:id", itemPickupDays.findOne);

    router.put("/:id", itemPickupDays.update);

    router.delete("/:id", itemPickupDays.delete);

    router.delete("/", itemPickupDays.deleteAll);

    app.use("/api/pickup_days", router);
}