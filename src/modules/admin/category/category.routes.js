const categoryController = require("./category.controller");

const router = require("express").Router();

router.post("/addCategory", categoryController.addCategory);
router.get("/getCategory/:id", categoryController.getCategoryById);
router.get("/allCategory", categoryController.getCategories);
router.get("/parents", categoryController.getParents);
router.get("/child/:parent", categoryController.getChildOfParent);
router.get("/children/:parent", categoryController.getChildrenOfParent);
router.delete("/remove/:id", categoryController.removeCategory);

module.exports = {
    CategoryRoutes: router
}