const autobind = require("auto-bind");
const Controller = require("../controller");
const { authSchema } = require("../../validators/user/auth.schema");
const createHttpError = require("http-errors");
class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            
            return res.status(200).send("Index Page Store")
        } catch (error) {
            next(error)
        }
    }


}
module.exports = new HomeController()