const autoBind = require("auto-bind");
const { ConversationModel } = require("../conversation.model");

class NamespaceService {
    #model
    constructor() {
        autoBind(this);
        this.#model = ConversationModel
    }
    //#region Namespace
    async addNameSpace(title, endPoint) {
        return await this.#model.create({
            title: title, 
            endPoint:endPoint })
    }
    async getNameSpaces(title, endPoint) {
        return await this.#model.find({})
    }
    async getNamespaceWithEndPoint(endpoint){
        return await this.#model.findOne({endPoint:endpoint})
    }

    //#endregion
   
    //#region Room
    async addRoom(endPoint,name,description,image){
        return await this.#model.updateOne({endPoint},{
            $push:{
                rooms:{
                    name,
                    description,
                    image
                }
            }
        })
    }
    async getRooms(){
        return conversations = await this.#model.find({},{rooms:1})
    }
    async getRoomWithName(name){
        return await this.#model.findOne({"rooms.name":name})
    }
    //#endregion

    //#region Message

    //#endregion

}


module.exports = new NamespaceService()