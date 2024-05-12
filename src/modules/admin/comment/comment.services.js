const autoBind = require("auto-bind");


class CommentService {
    #model
    constructor() {
        autoBind(this);
        this.#model = CommentModel;
    }
    async getCommentsOfBlog(blogId){
        
    }
    
}
module.exports = new CommentService();