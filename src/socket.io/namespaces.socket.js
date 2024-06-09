const namespaceController = require("../modules/client/chat/namespace/namespace.controller")
const namespaceService = require("../modules/client/chat/namespace/namespace.service")

class NameSpaceSocketHandler {
    #io
    constructor(io) {
        this.#io = io
    }
    initConnection(){
        this.#io.on("connection",async socket=>{
            const namespacesList = await namespaceService.getNameSpaces()
            socket.emit("namespacesList",namespacesList);
        })
    }
    async createNamespacesConnection(){
        const namespacesList = await namespaceService.getNameSpaces()
        for(const namespace of namespacesList){
            this.#io.of(`/${namespace.endPoint}`).on("connection",socket=>{
                socket.emit("roomList",namespace.rooms)
            })
        }
    }
}
module.exports =   NameSpaceSocketHandler