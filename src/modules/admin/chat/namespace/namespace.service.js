const autoBind = require("auto-bind");
const { ConversationModel } = require("../conversation.model");

class NamespaceService {
    #model
    constructor() {
        autoBind(this);
        this.#model = ConversationModel
    }
    async addNameSpace(title,endPoint){
        return  await this.#model.creat({title,endPoint})
    }
    async getNameSpaces(title,endPoint){
        return await this.#model.find({},{rooms:0})
    }
}


module.exports = new NamespaceService()