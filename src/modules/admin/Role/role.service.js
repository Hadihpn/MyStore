const autoBind = require("auto-bind");
const { RoleModel } = require("./role.model");
const createHttpError = require("http-errors");
const { query } = require("express");

class RoleService {
    #model
    constructor() {
        autoBind(this)
        this.#model = RoleModel;
    }
    async getAllRole(search) {
        return await this.#model.find(search).populate([{path:"permissions",select:{title:1,_id:0}}])
        // return await this.#model.find()
    }
    async getRoleWithIdOrTitle(query) {
        const role = await this.#model.findOne(query)
        return role;
    }
    async existRoleByTitleOrId(query) {
        const role = await this.#model.findOne(query)
        if (role) throw new createHttpError.BadRequest("this role already existed")
    }
    async addRole(roleDto) {
        return await this.#model.create(roleDto)
    }

    async updateRole(query, data) {
        return this.#model.updateOne(query, {
            $set: data
        })
    }
    async deleteRole(query) {
        return await this.#model.deleteOne(query)
    }
}
module.exports = new RoleService()
