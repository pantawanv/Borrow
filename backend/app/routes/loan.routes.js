module.exports = app => {

    const loans = require("../controllers/loan.controller.js");
    const router = require("express").Router();

    router.post("/", loans.create);

    router.get("/", loans.findAll);

    router.get("/:id", loans.findOne);

    router.put("/:id", loans.update);

    router.delete("/:id", loans.delete);

    router.delete("/", loans.deleteAll);

    app.use("/api/loans", router);
}