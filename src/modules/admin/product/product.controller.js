const autoBind = require("auto-bind");
const ProductServices = require("./product.services");
const { addProductSchema } = require("../../../common/validators/admin/product.schema");

class ProductController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = ProductServices
    }
    async addProduct(req,res,next) {
        try {
            // console.log(req.body.tags);
            const productBody = await addProductSchema.validateAsync(req.body);
            return res.json({
                data:productBody
            })
            const {title,text,short_text,category,price,count,dicsount,type,format,supplier} = req.body
        } catch (error) {
            next(error)
        }
    }
    async getListOfProduct(req,res,next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async getProductById(req,res,next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async editProduct(req,res,next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async deleteProduct(req,res,next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new ProductController()