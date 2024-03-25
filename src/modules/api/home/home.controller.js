const autobind = require("auto-bind");
// const Controller = require("../../../../app/http/controllers/controller");
const { authSchema } = require("../../../common/validators/client/auth.schema");
const createHttpError = require("http-errors");
class HomeController  {
    constructor(){
        autobind(this)
    }
    async indexPage(req, res, next) {
        try {
            
            return res.status(200).send("Index Page Store")
        } catch (error) {
            next(error)
        }
    }


}
module.exports = new HomeController()