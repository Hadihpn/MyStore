const categoryController = require("./category.controller");

const router = require("express").Router();

router.post("/addCategory", categoryController.addCategory);
router.get("/parents", categoryController.getParents);

module.exports = {
    CategoryRoutes: router
}