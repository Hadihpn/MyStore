const categoryController = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

router.post("/create", categoryController.addCategory);

module.exports = {
    CategouryRoutes: router
}