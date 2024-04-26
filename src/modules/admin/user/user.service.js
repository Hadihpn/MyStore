const { UserModel } = require("../../client/user/user.model");

class UserService {
    #model
    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }
}
module.exports = new UserService()
