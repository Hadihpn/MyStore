const autoBind = require("auto-bind");
const { BlogModel } = require("./blog.model");

class BlogServices {
    #model
    constructor() {
        autoBind(this);
        this.#model = BlogModel;
    }
    async createBlog(blogDto){
        await this.#model.create(blogDto)
    }
}
module.exports = new BlogServices()