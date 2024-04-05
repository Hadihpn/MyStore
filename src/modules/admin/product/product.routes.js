const productController = require("./product.controller");

const router = require("express").Router();

router.post("/addProduct", productController.addProduct)
module.exports = {
    ProductRoutes: router
}