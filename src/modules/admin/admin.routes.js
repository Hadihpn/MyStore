const { CategoryRoutes } = require("./category/category.routes");
const { DeveloperRoutes } = require("./developer/developer.routes");

const router = require("express").Router();

router.use("/developer", DeveloperRoutes)
router.use("/category", CategoryRoutes)
// router.use("/user", userController)
module.exports = {
    AdminRoutes: router
}