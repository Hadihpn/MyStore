const productController = require("./product.controller");
const { stringToArray } = require("../../../common/middleware/stringToArray");
const { uploadFile } = require("../../../common/utils/multer");
const { setFolderPath } = require("../../../common/middleware/setMulterUploadpath");
const router = require("express").Router();

router.post("/addProduct", setFolderPath("product"), uploadFile.array("images",10), stringToArray("tags"), productController.addProduct)
router.get("/", productController.getListOfProduct)
router.get("/:id", productController.getProductById)
router.patch("/edit/:id",setFolderPath("product"), uploadFile.array("images",10), stringToArray("tags"), productController.editProduct)
router.delete("/deleteProduct/:id", productController.deleteProduct)
module.exports = {
    ProductRoutes: router
}