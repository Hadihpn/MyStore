const categoryController = require("./category.controller");

const router = require("express").Router();

router.post("/addCategory", categoryController.addCategory);
router.get("/allCategory", categoryController.getCategories);
router.get("/parents", categoryController.getParents);
router.get("/children/:parent", categoryController.getChildrenOfParent);

module.exports = {
    CategoryRoutes: router
}