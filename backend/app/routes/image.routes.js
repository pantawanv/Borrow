module.exports = app => {

    const images = require("../controllers/image.controller.js");
    const router = require("express").Router();

    router.post("/", images.create);

    router.get("/", images.findAll);

    router.get("/:id", images.findOne);

    router.put("/:id", images.update);

    // DELETE all images for item
    router.delete("/item/:itemId", images.deleteByItemId);

    // DELETE one image
    router.delete("/:id", images.delete);

    // DELETE all images
    router.delete("/", images.deleteAll);

    
    app.use("/api/images", router);
}