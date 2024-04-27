const permissionController = require("./permission.controller");

const router = require("express").Router();

router.post("/add", permissionController.addPermission)
router.get("/", permissionController.getAllPermission)
// router.get("/:id", productController.getProductById)
 router.patch("/update/:field", permissionController.updatePermission)
router.delete("/delete/:field", permissionController.deletePermission)
module.exports = {
    PermissionRoutes: router
}