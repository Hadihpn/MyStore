const autoBind = require("auto-bind")
class CommentController {
    #services
    constructor() {
        autoBind(this);
        this.#services = categoryServices
    }

}
module.exports = new CommentController()