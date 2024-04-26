const permissionController = require("./permission.controller");

const router = require("express").Router();

router.post("/add", permissionController.addPermission)
router.get("/", permissionController.getAllPermission)
// router.get("/:id", productController.getProductById)
 router.patch("/update/:id", permissionController.updatePermission)
router.delete("/delete/:id", permissionController.deletePermission)
module.exports = {
    PermissionRoutes: router
}