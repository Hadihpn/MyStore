const autoBind = require("auto-bind");
const namespaceService = require("./namespace.service");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { createChatMessageSchema } = require("../../../../common/validators/admin/chatMessage.schema");
const { listOfImagesFormRequest } = require("../../../../common/utils/function");
class NamespaceController {
    #service;
    constructor() {
        autoBind(this)
        this.#service = namespaceService
    }
    //#region NameSpace
    async addNamespace(req, res, next) {
        try {
            const { title, endPoint } = req.body;
            if (!title || !endPoint || title.toString().trim() == "" || endPoint.toString().trim() == "") throw new createHttpError("please enter valid input")
            const namespace = await this.#service.getNamespaceWithEndPoint(endPoint);
            if (namespace) throw new createHttpError.BadRequest("this endPoint had been created before")
            const conversation = await this.#service.addNameSpace(title, endPoint);
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
    async addRoom(req, res, next) {
        try {
            // const namespaceId = req.params;
            // if (!isValidObjectId(namespaceId)) throw new createHttpError("please enter valid id")
            const { namespace, name, description, filename, fileUploadPath } = req.body;
            if (!name || name.toString().trim() == "" || !namespace || namespace.toString().trim() == "") throw new createHttpError("please enter valid input")
            const endPoint = await this.#service.getNamespaceWithEndPoint(namespace);
            if (!endPoint) throw new createHttpError.BadRequest("there is not any namespace with this name")
            const room = await this.#service.getRoomWithName(name)
            if (room) throw new createHttpError.BadRequest("this room name had been created before")
            const uploadPath = req.body.fileUploadPath
            const image = listOfImagesFormRequest(req.file || [], uploadPath)
            const conversation = await this.#service.addRoom(namespace, name, description, image);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "the room has been created successfully",
                    result: conversation
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getRooms(req, res, next) {
        try {
            const rooms = this.#service.getRooms();
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    roomsList: rooms
                }
            })
        } catch (error) {
            next(error)
        }
    }
    //#endregion

    //#region Message
    async addMessage(req, res, next) {
        try {
            const namespaceId = req.params;
            if (!isValidObjectId(namespaceId)) throw new createHttpError("please enter valid id")
            const { sender, message, datetime } = req.body;
            await createChatMessageSchema.validateAsync({ sender, message, datetime })
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