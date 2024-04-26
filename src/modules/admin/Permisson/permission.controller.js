const autoBind = require("auto-bind");
const { StatusCodes: httpstatus } = require("http-status-codes");
const { deleteInvalidPropertyInObject } = require("../../../common/utils/function");
const permissionService = require("./permission.service");
const { createPermissionSchema } = require("../../../common/validators/admin/permission.schema");
const createHttpError = require("http-errors");

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
    async addPermission(req,res,next){
        try {
            const permissionDataBody =await createPermissionSchema.validateAsync(req.body);
            await this.#service.existPermissionByTitle(permissionDataBody.title)
            const role = await this.#service.addPermission(permissionDataBody)
            if(!role) throw new createHttpError.InternalServerError("cannot creat permission")
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    message:"the new permission add successfully",
                    role

                }
            }) 
        } catch (error) {
            next(error)
        }

    }
    async updatePermission(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }

    }
    async deletePermission(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }

    }
    
}
module.exports = new PermissionController()