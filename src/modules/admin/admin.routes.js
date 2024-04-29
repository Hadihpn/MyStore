const { ROLES } = require("../../common/constant/constantVar");
const {Authorization, checkRole, checkPermission} = require("../../common/guard/authorization.guard");
const { PermissionRoutes } = require("./Permisson/permission.routes");
const {RoleRoutes} = require("./Role/role.routes");
const {BlogRoutes} = require("./blog/blog.routes");
const { CategoryRoutes } = require("./category/category.routes");
const { CourseRoutes } = require("./course/course.routes");
const { DeveloperRoutes } = require("./developer/developer.routes");
const { ProductRoutes } = require("./product/product.routes");
const { UserManagmentRoutes} = require("./user/user.routes");

const router = require("express").Router();

router.use("/developer", DeveloperRoutes)
router.use("/category", CategoryRoutes)
router.use("/blog", BlogRoutes)
router.use("/product", ProductRoutes)
router.use("/course", CourseRoutes)
router.use("/userManagment", UserManagmentRoutes)
router.use("/role",RoleRoutes )
router.use("/permission",Authorization,checkPermission(["AdminPermission"]), PermissionRoutes)
module.exports = {
    AdminRoutes: router
}