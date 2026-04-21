module.exports = app => {

    const images = require("../controllers/image.controller.js");
    const router = require("express").Router();

    router.post("/", images.create);

    router.get("/", images.findAll);

    router.get("/:id", images.findOne);

    router.put("/:id", images.update);

    router.delete("/:id", images.delete);

    router.delete("/", images.deleteAll);

    app.use("/api/images", router);
}