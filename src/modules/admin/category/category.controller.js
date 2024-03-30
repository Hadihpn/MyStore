const createHttpError = require("http-errors");
const { addCategorySchema, updateCategorySchema } = require("../../../common/validators/admin/category.schema");
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
    async editCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            console.log(title);
            await updateCategorySchema.validateAsync(req.body);
            const resultOfUpdate = await this.#services.editCategory(id, title);
            if (resultOfUpdate.modifiedCount == 0) throw createHttpError.InternalServerError("nothing been updated")
            return res.status(200).json({
                statusCode:200,
                message:"the category update successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    async getCategories(req, res, next) {
        try {
            const categories = await this.#services.getAllCategory();
            return res.status(200).json({
                data: categories
            })
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
    async getChildOfParent(req, res, next) {
        try {
            const { parent } = req.params;
            const categories = await this.#services.getChildOfParent(parent);
            return res.status(200).json({
                data: categories
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildrenOfParent(req, res, next) {
        try {
            const { parent } = req.params;
            const categories = await this.#services.getChildrenOfParent(parent);
            return res.status(200).json({
                data: categories
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next) {
        try {
            const { id } = req.params;
            await this.#services.removeCategory(id);
            const categories = await this.#services.getAllCategory();
            return res.status(200).json({
                data: categories
            })
        } catch (error) {
            next(error)
        }
    }
    async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            const category = await this.#services.getCategoryById(id);
            return res.status(200).json({
                data: category
            })
        } catch (error) {
            next(error)
        }
    }

}
module.exports = new CategoryController()