const { addCategorySchema } = require("../../../common/validators/admin/category.schema");
const { CategoryMessage } = require("./category.messages");
const categoryServices = require("./category.services");
// const Controller = require("../../../../app/http/controllers/controller");
const autoBind = require("auto-bind")
class CategoryController {
    #services
    constructor() {
        autoBind(this);
        this.#services = categoryServices
    }
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, slug, icon, parent } = req.body;
            await this.#services.creatCategory({ title, slug, icon, parent })
            return res.status(200).json({
                message: CategoryMessage.Create
            })
        } catch (error) {
            next(error)
        }
    }
    removeCategory(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    editCategory(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    getCategories(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async getParents(req, res, next) {
        try {
            const categories = await this.#services.getParentsCategory();
            return res.status(200).json({
                data: categories
            })
        } catch (error) {
            next(error)
        }
    }
    getCategoryById(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    getChild(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new CategoryController()