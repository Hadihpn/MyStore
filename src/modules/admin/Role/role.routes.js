const { stringToArray } = require("../../../common/middleware/stringToArray");
const roleController = require("./role.controller");

const router = require("express").Router();

router.post("/addRole", stringToArray("permissions"), roleController.addRole)
router.get("/", roleController.getAllRole)
// router.get("/:id", productController.getProductById)
router.patch("/update/:field", stringToArray("permissions"), roleController.updateRole)
router.delete("/delete/:field", roleController.deleteRole)
module.exports = {
    RoleRoutes: router
}