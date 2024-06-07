const autoBind = require("auto-bind");
const namespaceService = require("./namespace.service");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");
class NamespaceController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = namespaceService
    }
    //#region NameSpace
    addNamespace(req, res, next) {
        try {
            const { title, endPoint } = req.body;
            if (!title || !endPoint || title.toString().trim() == "" || endPoint.toString().trim() == "") throw new createHttpError("please enter valid input")
            const conversation = this.#service.addNameSpace(title, endPoint);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "the namespace has been created successfully",
                    result: conversation
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
                statusCode: HttpStatus.OK,
                data: {
                    namespacesList: namespaces
                }
            })
        } catch (error) {
            next(error)
        }
    }
    //#endregion
    //#region Room
    addRoom(req, res, next) {
        try {
            const namespaceId = req.params;
            if (!isValidObjectId(namespaceId)) throw new createHttpError("please enter valid id")
            const { name, description, image } = req.body;
            if (!name || name.toString().trim() == "") throw new createHttpError("please enter valid input")
            const conversation = this.#service.addNameSpace(title, endPoint);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "the namespace has been created successfully",
                    result: conversation
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getRooms(req, res, next) {
        try {
            const namespaces = this.#service.getNameSpaces();
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    namespacesList: namespaces
                }
            })
        } catch (error) {
            next(error)
        }
    }
    //#endregion

    //#region Message
    addMessage(req, res, next) {
        try {
            const namespaceId = req.params;
            if (!isValidObjectId(namespaceId)) throw new createHttpError("please enter valid id")
            const { name, description, image } = req.body;
            if (!name || name.toString().trim() == "") throw new createHttpError("please enter valid input")
            const conversation = this.#service.addNameSpace(title, endPoint);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "the namespace has been created successfully",
                    result: conversation
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getMessages(req, res, next) {
        try {
            const namespaces = this.#service.getNameSpaces();
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    namespacesList: namespaces
                }
            })
        } catch (error) {
            next(error)
        }
    }
    //#endregion

}
module.exports = new NamespaceController()