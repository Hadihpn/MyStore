const userController = require("./user.controller");
const router = require("express").Router();

// router.post("/addProduct", setFolderPath("product"), uploadFile.array("images",10), stringToArray("tags"), productController.addProduct)
router.get("/", userController.getAllUser)
// router.get("/:id", productController.getProductById)
 router.patch("/update/:id", userController.updateUserProfile)
// router.delete("/deleteProduct/:id", productController.deleteProduct)
module.exports = {
    UserManagmentRoutes: router
}