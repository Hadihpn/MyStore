const autobind = require("auto-bind");
const Controller = require("../controller");
const { authSchema } = require("../../validators/user/auth.schema");
const createHttpError = require("http-errors");
class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            const result = await authSchema.valid(req.body)
            return res.status(200).send("Index Page Store")
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }


}
module.exports = new HomeController()