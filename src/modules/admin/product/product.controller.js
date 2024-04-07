const autoBind = require("auto-bind");
const { addProductSchema } = require("../../../common/validators/admin/product.schema");
const { deleteFileInPublic, removePathBackSlash, listOfImagesFormRequest } = require("../../../common/utils/function");
const path = require("path");
const productServices = require("./product.services");
const { resourceLimits } = require("worker_threads");
class ProductController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = productServices
    }
    async addProduct(req, res, next) {
        try {
            // console.log(req.body.tags);
            const uploadPath = removePathBackSlash(req.body.fileUploadPath)
            const images = listOfImagesFormRequest(req?.files || [], uploadPath);
            const productDataBody = await addProductSchema.validateAsync(req.body);
            req.body.image = images
            const { title, text, short_text, category, price, count, dicsount, type, format, supplier } = req.body;
            await this.#service.createProduct({ title, text, short_text, category, price, images, count, dicsount, type, format, supplier });
            return res.json({
                data: productDataBody
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async getListOfProduct(req, res, next) {
        try {
            const products = await this.#service.getProducts()
            return res.status(200).json({
                statusCode: 200,
                data: products
            })
        } catch (error) {
            next(error)
        }
    }
    async getProductById(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async editProduct(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async deleteProduct(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new ProductController()