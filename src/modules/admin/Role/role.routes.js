const { stringToArray } = require("../../../common/middleware/stringToArray");
const roleController = require("./role.controller");

const router = require("express").Router();

router.post("/addRole",stringToArray("permissions"), roleController.addRole)
router.get("/", roleController.getAllRole)
// router.get("/:id", productController.getProductById)
router.patch("/update/:id", roleController.updateRole)
router.delete("/deleteProduct/:id", roleController.deleteRole)
module.exports = {
    RoleRoutes: router
}