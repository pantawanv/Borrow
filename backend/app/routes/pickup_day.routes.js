module.exports = app => {

    const pickupDays = require("../controllers/item_pickup_day.controller.js");
    const router = require("express").Router();

    router.post("/", pickupDays.create);

    router.get("/", pickupDays.findAll);

    router.get("/:id", pickupDays.findOne);

    router.put("/:id", pickupDays.update);

    router.delete("/:id", pickupDays.delete);

    router.delete("/", pickupDays.deleteAll);

    app.use("/api/pickup_days", router);
}