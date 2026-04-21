module.exports = app => {

    const itemPickupTimes = require("../controllers/item_pickup_time.controller.js");
    const router = require("express").Router();

    router.post("/", itemPickupTimes.create);

    router.get("/", itemPickupTimes.findAll);

    router.get("/:id", itemPickupTimes.findOne);

    router.put("/:id", itemPickupTimes.update);

    router.delete("/:id", itemPickupTimes.delete);

    router.delete("/", itemPickupTimes.deleteAll);

    app.use("/api/item_pickup_times", router);
}