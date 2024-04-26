const autoBind = require("auto-bind");
const { addProductSchema, editProductSchema } = require("../../../common/validators/admin/product.schema");
const { deleteFileInPublic, removePathBackSlash, listOfImagesFormRequest, copyObject, deleteInvalidPropertyInObject } = require("../../../common/utils/function");
const path = require("path");
const productServices = require("./product.services");
const { resourceLimits } = require("worker_threads");
const { ObjectIdSchema } = require("../../../common/validators/public.schema");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../common/constant/constantVar");
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
            const search = req?.query?.search || "";
            console.log(typeof (search));
            const products = await this.#service.getProducts(search)
            return res.status(200).json({
                statusCode: 200,
                data: { products }
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
                data: { product }
            })
        } catch (error) {
            next(error)
        }
    }
    async editProduct(req, res, next) {
        try {
            const { id } = await ObjectIdSchema.validateAsync(req.params);
            const data = req.body;
            const product = await this.#service.getProductById(id);

            // // let nullishData = ["", " ", "0", 0, null, undefined]
            let blackListField = ["bookmarks", "likes", "dislikes", "comments"]

            deleteInvalidPropertyInObject(data, blackListField);

            const result = await this.#service.editProduct(id, data);
            // const updatedProduct = await this.#service.getProductById(id)
            // await editProductSchema.validateAsync(updatedProduct)
            if (result.modifiedCount == 0) throw createHttpError.InternalServerError("بروزرسانی انجام نشد")
            if (req.files) {
                const uploadPath = req.body.fileUploadPath
                const images = listOfImagesFormRequest(req?.files || [], uploadPath);
                deleteFileInPublic(product.images.split(","))
                // req.body.images = images;
            }
            return res.status(201).json({
                statusCode: 201,

                data: {
                    message: "بلاگ با موفقیت ایجاد شد",
                    product: "productDataBody"
                },
            })
        } catch (error) {
            // deleteFileInPublic((req.body.images).split(","))
            console.log(req.body);
            next(error)
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const { id } = await ObjectIdSchema.validateAsync(req.params);
            const images = await this.#service.deleteProduct(id);
            deleteFileInPublic(images.split(","))
            return res.status(200).json({
                data: {
                    message: "با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new ProductController()