module.exports = app => {

    const pickupTimes = require("../controllers/pickup_time.controller.js");
    const router = require("express").Router();

    router.post("/", pickupTimes.create);

    router.get("/", pickupTimes.findAll);

    router.get("/:id", pickupTimes.findOne);

    router.put("/:id", pickupTimes.update);

    router.delete("/:id", pickupTimes.delete);

    router.delete("/", pickupTimes.deleteAll);
    
    app.use("/api/pickup_times", router);
}