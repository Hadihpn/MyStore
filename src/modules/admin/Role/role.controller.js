const autoBind = require("auto-bind");
const { StatusCodes: httpstatus } = require("http-status-codes");
const { deleteInvalidPropertyInObject } = require("../../../common/utils/function");
const roleService = require("./role.service");
const { createRoleSchema } = require("../../../common/validators/admin/role.schema");
const createHttpError = require("http-errors");

class RoleController {
    #service
    constructor() {
        autoBind(this);
        this.#service = roleService
    }
    async getAllRole(req, res, next) {
        try {
            const { search } = req.query;
            const dataBaseQuery = {}
            if (search) dataBaseQuery['$text'] = { $search: search }
            const users = await this.#service.getAllRole(dataBaseQuery);
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
    async addRole(req,res,next){
        try {
            if (req?.body?.permissions) req.body.permissions = req.body.permissions.split(",");
            const roleDataBody =await createRoleSchema.validateAsync(req.body);
            console.log(roleDataBody);
            await this.#service.existRoleByTitle(roleDataBody.title)
            const role = await this.#service.addRole(roleDataBody)
            if(!role) throw new createHttpError.InternalServerError("cannot creat role")
            return res.status(httpstatus.OK).json({
                statusCode: httpstatus.OK,
                data: {
                    message:"the new role add successfully",
                    role

                }
            }) 
        } catch (error) {
            next(error)
        }

    }
    async updateRole(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }

    }
    async deleteRole(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }

    }
    
}
module.exports = new RoleController()