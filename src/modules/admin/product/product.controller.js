const autoBind = require("auto-bind");
const ProductServices = require("./product.services");

class ProductController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = ProductServices
    }
    async addProduct() {
        try {

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new ProductController()