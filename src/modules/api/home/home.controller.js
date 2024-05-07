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
            
            return res.status(200).send("Index Page Store <a href='/swagger' target=”_blank”>swagger</a> <a href='/graphQl' target=”_blank”>graphQl</a>")
        } catch (error) {
            next(error)
        }
    }


}
module.exports = new HomeController()