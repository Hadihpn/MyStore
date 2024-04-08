const autoBind = require("auto-bind");
const { addProductSchema, editProductSchema } = require("../../../common/validators/admin/product.schema");
const { deleteFileInPublic, removePathBackSlash, listOfImagesFormRequest } = require("../../../common/utils/function");
const path = require("path");
const productServices = require("./product.services");
const { resourceLimits } = require("worker_threads");
const { ObjectIdSchema } = require("../../../common/validators/public.schema");
const createHttpError = require("http-errors");
class ProductController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = productServices
    }
    async addProduct(req, res, next) {
        const uploadPath = req.body.fileUploadPath
        const images = listOfImagesFormRequest(req?.files || [], uploadPath);
        try {
            const productDataBody = await addProductSchema.validateAsync(req.body);
            req.body.image = images
            const { title, text, short_text, category, price, count, dicsount, type, format, supplier } = req.body;
            await this.#service.createProduct({ title, text, short_text, category, price, images, count, dicsount, type, format, supplier });
            return res.json({
                data: productDataBody,
                images: images.split(",")
            })
        } catch (error) {
            deleteFileInPublic(images.split(","))
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
            const { id } = await ObjectIdSchema.validateAsync(req.params)
            const product = await this.#service.getProductById(id);
            if (!product) throw createHttpError.NotFound("محصولی یافت نشد");
            return res.status(200).json({
                product: product
            })
        } catch (error) {
            next(error)
        }
    }
    async editProduct(req, res, next) {
        try {
            const { id } = await ObjectIdSchema.validateAsync(req.params);
            const product = await this.#service.getProductById(id);
            const data = req.body;
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                const uploadPath = req.body.fileUploadPath
                const images = listOfImagesFormRequest(req?.files || [], uploadPath);
                if(product.images != images){
                    deleteFileInPublic(product.images.split(","))
                    req.body.images = images;
                }else{
                    deleteFileInPublic(images.split(","))
                }
                
            }
            let nullishData = ["", " ", "0", 0, null, undefined]
            let blackListField = ["bookmarks", "likes", "dislikes", "comments"]
            Object.keys(data).forEach(key => {
                if (blackListField.includes(key)) delete data[key];
                if (typeof data[key] == "string") data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) { data[key] = data[key].map(item => item.trim()) }
                else if (Array.isArray(data[key]) && data[key].length == 0) { delete data[key] }
                if (nullishData.includes(data[key])) delete data[key];
                product[key] = data[key]
            })
            const productDataBody = editProductSchema.validate(product)
            const updateResult = await this.#service.editProduct(id, product);
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("بروزرسانی انجام نشد")
            return res.status(201).json({
                statusCode: 201,
                message: "بلاگ با موفقیت ایجاد شد",
                data: productDataBody,
            })
        } catch (error) {
            deleteFileInPublic((req.body.images).split(","))
            next(error)
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const { id } = await ObjectIdSchema.validateAsync(req.params);
            const images = await this.#service.deleteProduct(id);
            deleteFileInPublic(images.split(","))
            return res.status(200).json({
                message: "با موفقیت حذف شد"
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new ProductController()