const autobind = require("auto-bind");
const blogServices = require("./blog.services");
const { createBlogSchema } = require("../../../common/validators/admin/blog.shema");
const { deleteFileInPublic } = require("../../../common/utils/function");
const path = require("path")
class BlogController {
    #service
    constructor() {
        autobind(this);
        this.#service = blogServices;
    }
    async createBlog(req, res, next) {
        try {

            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            const uploadPath = blogDataBody.fileUploadPath.toString().replace(/\\/g, "/")
            req.body.image = path.join(uploadPath, blogDataBody.filename).toString()
            const { author, title, text, short_text, category, tags, image } = req.body;
            await this.#service.createBlog({ author, title, text, short_text, category, tags, image })
            return res.status(201).json({
                statusCode: 201,
                message: "بلاگ با موفقیت ایجاد شد",
                data: blogDataBody
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async getBlogById(req, res, next) {
        try {

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