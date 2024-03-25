const categoryController = require("./category.controller");

const router = require("express").Router();

router.post("/addCategory", categoryController.addCategory);

module.exports = {
    CategoryRoutes: router
}