const {BlogRoutes} = require("./blog/blog.routes");
const { CategoryRoutes } = require("./category/category.routes");
const { DeveloperRoutes } = require("./developer/developer.routes");

const router = require("express").Router();

router.use("/developer", DeveloperRoutes)
router.use("/category", CategoryRoutes)
router.use("/blog", BlogRoutes)
// router.use("/user", userController)
module.exports = {
    AdminRoutes: router
}