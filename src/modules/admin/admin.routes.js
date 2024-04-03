const Authorization = require("../../common/guard/authorization.guard");
const {BlogRoutes} = require("./blog/blog.routes");
const { CategoryRoutes } = require("./category/category.routes");
const { DeveloperRoutes } = require("./developer/developer.routes");

const router = require("express").Router();

router.use("/developer", DeveloperRoutes)
router.use("/category", CategoryRoutes)
router.use("/blog",Authorization, BlogRoutes)
// router.use("/user", userController)
module.exports = {
    AdminRoutes: router
}