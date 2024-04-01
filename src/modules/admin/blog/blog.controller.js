const autobind = require("auto-bind");
const blogServices = require("./blog.services");
const { createBlogSchema } = require("../../../common/validators/admin/blog.shema");
class BlogController {
    #service
    constructor() {
        autobind(this);
        this.#service = blogServices;
    }
    async createBlog(req, res, next) {
        try {

            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename).replace(/\\/g, "/")
            const { title, text, short_text, category, tags, image } = req.body;
            await this.#service.createBlog({ title, text, short_text, category, tags, image })
            return res.json(blogDataBody)
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
            return res.status(200).json({
                blog: []
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