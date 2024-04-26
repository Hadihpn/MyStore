const autoBind = require("auto-bind");
const { PermissionModel } = require("./permission.model");
const createHttpError = require("http-errors");

class PermissionService {
    #model
    constructor() {
        autoBind(this)
        this.#model = PermissionModel;
    }
    async getAllPermission(search) {
        return await this.#model.find(search)
    }
    async existPermissionByTitle(title){
        const permission = await this.#model.findOne({title})
        if(permission) throw new createHttpError.BadRequest("this permission already existed")
    }
    async addPermission(permissionDto){
        return await this.#model.create(permissionDto)

    }
    async updatePermission(){
        

    }
    async deletePermission(){
        

    }
}
module.exports = new PermissionService()
