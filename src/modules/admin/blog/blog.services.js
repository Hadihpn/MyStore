const autoBind = require("auto-bind");
const { BlogModel } = require("./blog.model");

class BlogServices {
    #model
    constructor() {
        autoBind(this);
        this.#model = BlogModel;
    }
}
module.exports = new BlogServices()