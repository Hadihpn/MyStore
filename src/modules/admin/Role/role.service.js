const autoBind = require("auto-bind");
const { RoleModel } = require("./role.model");
const createHttpError = require("http-errors");

class RoleService {
    #model
    constructor() {
        autoBind(this)
        this.#model = RoleModel;
    }
    async getAllRole(search) {
        return await this.#model.find(search)
    }
    async existRoleByTitle(title){
        const role = await this.#model.findOne({title})
        if(role) throw new createHttpError.BadRequest("this role already existed")
    }
    async addRole(roleDto){
        console.log(roleDto);
        return await this.#model.create(roleDto)
    }
    
    async updateRole(){

    }
    async deleteRole(){

    }
}
module.exports = new RoleService()
