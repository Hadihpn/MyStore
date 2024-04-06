const autoBind = require("auto-bind");
const { addProductSchema } = require("../../../common/validators/admin/product.schema");
const { deleteFileInPublic, removePathBackSlash } = require("../../../common/utils/function");
const path = require("path");
const productServices = require("./product.services");
class ProductController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = productServices
    }
    async addProduct(req,res,next) {
        try {
            // console.log(req.body.tags);
            const productDataBody = await addProductSchema.validateAsync(req.body);
            const uploadPath = removePathBackSlash(productDataBody.fileUploadPath)
            req.body.image = path.join(uploadPath, productDataBody.filename).toString()
            const {title,text,short_text,category,price,count,dicsount,type,format,supplier} = req.body
            await this.#service.createProduct({title,text,short_text,category,price,count,dicsount,type,format,supplier})
            return res.json({
                data:productDataBody
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
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