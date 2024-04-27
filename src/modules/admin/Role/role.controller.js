const autoBind = require("auto-bind");
const { StatusCodes: httpstatus } = require("http-status-codes");
const { deleteInvalidPropertyInObject, copyObject } = require("../../../common/utils/function");
const roleService = require("./role.service");
const { createRoleSchema } = require("../../../common/validators/admin/role.schema");
const createHttpError = require("http-errors");
const { ObjectIdSchema } = require("../../../common/validators/public.schema");
const { default: mongoose } = require("mongoose");

class RoleController {
    #service
    constructor() {
        autoBind(this);
        this.#service = roleService
    }
    async getAllRole(req, res, next) {
        try {
            const { search } = req.query;
            console.log(search);
            const dataBaseQuery = {}
            if (search) dataBaseQuery['$text'] = { $search: search }
            console.log(dataBaseQuery);
            const roles = await this.#service.getAllRole(dataBaseQuery);
            // const roles = await this.#service.getAllRole();
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async addRole(req, res, next) {
        try {
            if (req?.body?.permissions) req.body.permissions = req.body.permissions.split(",");
            const roleDataBody = await createRoleSchema.validateAsync(req.body);
            let query = { title: roleDataBody.title };
            const role = await this.#service.getRoleWithIdOrTitle(query)
            if (role) throw new createHttpError.BadRequest("this role already existed")
            const newRole = await this.#service.addRole(roleDataBody)
            if (!newRole) throw new createHttpError.InternalServerError("cannot creat role")
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    message: "the new role add successfully",
                    newRole

                }
            })
        } catch (error) {
            next(error)
        }

    }
    async updateRole(req, res, next) {
        try {
            const { field } = req.params
            let query = mongoose.isValidObjectId(field) ? { _id: field } : { title: field }
            const data = copyObject(req.body);
            const role = await this.#service.getRoleWithIdOrTitle(query)
            if (!role) throw new createHttpError.BadRequest("cannot find any role ")
            deleteInvalidPropertyInObject(data, [])
            const updateResult = await this.#service.updateRole(query, data)
            if (!updateResult) throw new createHttpError.BadRequest("cannot update any role ")
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    message: "the role updated successfully",
                }
            })
        } catch (error) {
            next(error)
        }

    }
    async deleteRole(req, res, next) {
        try {
            const { field } = req.params
            if (!field) throw new createHttpError.InternalServerError("please enter valid title or id")
            let query = mongoose.isValidObjectId(field) ? { _id: field } : { title: field }
            const role = await this.#service.getRoleWithIdOrTitle(query)
            if (!role) throw new createHttpError.BadRequest("cannot find any role ")
            const removeResult = await this.#service.deleteRole(query)
            if (!removeResult) throw new createHttpError.BadRequest("cannot remove any role ")
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    message: "the role deleted successfully",
                }
            })
        } catch (error) {
            next(error)
        }

    }

}
module.exports = new RoleController()