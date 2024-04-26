const autoBind = require("auto-bind");
const userService = require("./user.service");

class UserController {
    #service
constructor(){
autoBind(this);
this.#service = userService
}
}
module.exports = new UserController()