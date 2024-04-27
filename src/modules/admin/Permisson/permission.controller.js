const autoBind = require("auto-bind");
const { StatusCodes: httpstatus } = require("http-status-codes");
const { deleteInvalidPropertyInObject, copyObject } = require("../../../common/utils/function");
const permissionService = require("./permission.service");
const { createPermissionSchema } = require("../../../common/validators/admin/permission.schema");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");

class PermissionController {
    #service
    constructor() {
        autoBind(this);
        this.#service = permissionService
    }
    async getAllPermission(req, res, next) {
        try {
            const { search } = req.query;
            const dataBaseQuery = {}
            if (search) dataBaseQuery['$text'] = { $search: search }
            const users = await this.#service.getAllPermission(dataBaseQuery);
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async addPermission(req, res, next) {
        try {
            const permissionDataBody = await createPermissionSchema.validateAsync(req.body);
            const permission = await this.#service.getPermissionWithIdOrTitle(permissionDataBody.title)
            if (permission) throw new createHttpError.BadRequest("this permission already existed")
            const newPermission = await this.#service.addPermission(permissionDataBody)
            if (!newPermission) throw new createHttpError.InternalServerError("cannot creat permission")
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    message: "the new permission add successfully",
                    newPermission

                }
            })
        } catch (error) {
            next(error)
        }

    }
    async updatePermission(req, res, next) {
        try {
            const { field  } = req.params
            let query = mongoose.isValidObjectId(field) ? { _id: field } : { title: field }
            const data = copyObject(req.body);
            const permission = await this.#service.getPermissionWithIdOrTitle(query)
            if (!permission) throw new createHttpError.BadRequest("cannot find any permission ")
            deleteInvalidPropertyInObject(data, [])
            const updateResult = await this.#service.updatePermission(query, data)
            if (!updateResult) throw new createHttpError.BadRequest("cannot update any permission ")
             return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    message: "the permission updated successfully",
                }
            })
        } catch (error) {
            next(error)
        }

    }
    async deletePermission(req, res, next) {
        try {
            const {field} = req.params
            if (!field) throw new createHttpError.InternalServerError("please enter valid title or id")
            let query = mongoose.isValidObjectId(field) ? { _id: field } : { title: field }
            const permission = await this.#service.getRoleWithIdOrTitle(query)
            if(!permission) throw new createHttpError.BadRequest("cannot find any permission ")
            const removeResult = await this.#service.deletePermission(query)
            if(!removeResult) throw new createHttpError.BadRequest("cannot remove any permission ")
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    message: "the newPermission deleted successfully",
                }
            })
        } catch (error) {
            next(error)
        }

    }

}
module.exports = new PermissionController()