const { CategoryMessage } = require("../../Messages/admin/category.messages");
const categoryServices = require("../../services/admin/category.services");
const Controller = require("../controller");

class CategoryController extends Controller {
    #services
    constructor() {
        this.#services = categoryServices
    }
    async addCategory(req, res, next) {
        try {
            const { title, slug, icon, parent } = req.body;
            await this.#services.creatCategory({ title, slug, icon, parent })
            return res.status(200).json({
                message:CategoryMessage.Create
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
    getHeadCategories(req, res, next) {
        try {

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