const autoBind = require("auto-bind");
const namespaceService = require("./namespace.service");
const {StatusCodes:HttpStatus} = require("http-status-codes")
class NamespaceController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = namespaceService
    }
    addNamespace(req, res, next) {
        try {
            const { title, endPoint } = req.body;
            const conversation = this.#service.addNameSpace(title, endPoint);
            return res.status(HttpStatus.CREATED).json({
                statusCode:HttpStatus.CREATED,
                data:{
                    message:"the namespace has been created successfully",
                    result:conversation
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getNamespaces(req, res, next) {
        try {
            const namespaces = this.#service.getNameSpaces();
            return res.status(HttpStatus.OK).json({
                statusCode:HttpStatus.OK,
                data:{
                    namespacesList:namespaces
                }
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new NamespaceController()