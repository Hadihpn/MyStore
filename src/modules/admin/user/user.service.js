const autoBind = require("auto-bind");
const { UserModel } = require("../../client/user/user.model");

class UserService {
    #model
    constructor() {
        autoBind(this)
        this.#model = UserModel;
    }
    async getAllUser(search) {
        return await this.#model.find(search)
    }
    async updateUserProfile(userId, data) {
      return  await this.#model.updateOne({ "_id": userId }, {
            $set: data
        })
    }
}
module.exports = new UserService()
