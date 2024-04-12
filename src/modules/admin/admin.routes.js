const {Authorization, checkRole} = require("../../common/guard/authorization.guard");
const {BlogRoutes} = require("./blog/blog.routes");
const { CategoryRoutes } = require("./category/category.routes");
const { CourseRoutes } = require("./course/course.routes");
const { DeveloperRoutes } = require("./developer/developer.routes");
const { ProductRoutes } = require("./product/product.routes");

const router = require("express").Router();

router.use("/developer", DeveloperRoutes)
router.use("/category", CategoryRoutes)
router.use("/blog",Authorization,checkRole("blogcreator"), BlogRoutes)
router.use("/product", ProductRoutes)
router.use("/course", CourseRoutes)
// router.use("/user", userController)
module.exports = {
    AdminRoutes: router
}