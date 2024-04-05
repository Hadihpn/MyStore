const autobind = require("auto-bind");
const blogServices = require("./blog.services");
const { createBlogSchema, editBlogSchema } = require("../../../common/validators/admin/blog.shema");
const { deleteFileInPublic } = require("../../../common/utils/function");
const path = require("path");
const createHttpError = require("http-errors");
class BlogController {
    #service
    constructor() {
        autobind(this);
        this.#service = blogServices;
    }
    async createBlog(req, res, next) {
        try {
            if (req?.body?.category) req.body.category = req.body.category.split(",");
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            const uploadPath = blogDataBody.fileUploadPath.toString().replace(/\\/g, "/")
            req.body.image = path.join(uploadPath, blogDataBody.filename).toString()
            const { author, title, text, short_text, category, tags, image } = req.body;
            await this.#service.createBlog({ author, title, text, short_text, category, tags, image })
            return res.status(201).json({
                statusCode: 201,
                message: "بلاگ با موفقیت ایجاد شد",
                data: blogDataBody,
            })
            console.log(req.body.tags);
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async editBlog(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await this.#service.getBlogById(id);
            if (req?.body?.category) req.body.category = req.body.category.split(",");
            const data = req.body;
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                const uploadPath = req.body.fileUploadPath.toString().replace(/\\/g, "/")
                req.body.image = path.join(uploadPath, req.body.filename).toString();
                deleteFileInPublic(blog.image)
            }
            let nullishData = ["", " ", "0", 0, null, undefined]
            let blackListField = ["bookmarks", "likes", "dislikes", "comments", "author"]
            Object.keys(data).forEach(key => {
                if (blackListField.includes(key)) delete data[key];
                if (typeof data[key] == "string") data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) { data[key] = data[key].map(item => item.trim()) }
                else if (Array.isArray(data[key]) && data[key].length == 0) { delete data[key] }
                if (nullishData.includes(data[key])) delete data[key];
                blog[key] = data[key]
            })
            const blogDataBody = editBlogSchema.validate(blog)
            console.log(blog);
            const updateResult = await this.#service.editBlog(id, blog);
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("بروزرسانی انجام نشد")
            return res.status(201).json({
                statusCode: 201,
                message: "بلاگ با موفقیت ایجاد شد",
                data: blogDataBody,
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }

    async getBlogById(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await this.#service.getBlogById(id);
            if (!blog) throw new createHttpError.NotFound("بلاگ مربوطه یافت نشد");
            return res.status(200).json({
                blog: blog
            })
        } catch (error) {
            next(error)
        }
    }
    async getBlogByQurey(query = {}) {
        try {
            const blog = await this.#service.getBlogByQurey(query);
            if (!blog) throw new createHttpError.NotFound("هیچ بلاگی یافت نشد");
            return res.status(200).json({
                blog: blog
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlogs(req, res, next) {
        try {
            const blogs = await this.#service.getListOfBlogs()
            return res.status(200).json({
                blog: blogs
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteBlog(req, res, next) {
        try {
            const { id } = req.params;
            const imageAddress = await this.#service.deleteBlogById(id)
            deleteFileInPublic(imageAddress);
            return res.status(200).json({
                message: "بلاگ مربوطه با موفقیت حذف شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlog(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

}
module.exports = new BlogController()