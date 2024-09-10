const { array } = require("@hapi/joi")
const namespaceController = require("../modules/client/chat/namespace/namespace.controller")
const namespaceService = require("../modules/client/chat/namespace/namespace.service")

class NameSpaceSocketHandler {
    #io
    constructor(io) {
        this.#io = io
    }
    initConnection() {
        this.#io.on("connection", async socket => {
            const namespacesList = await namespaceService.getNameSpaces()
            socket.emit("namespacesList", namespacesList);
            this.#io.of(`/${namespacesList[0].endPoint}`).on("connection", async socket => {
                socket.emit("roomList", namespacesList[0].rooms)
            })
        })
    }
    // async createfirstNamespacesConnection() {
    //     const namespace = await namespaceService.getNameSpaces()
    //     this.#io.of(`/${namespace.endPoint}`).on("connection", async socket => {
    //         socket.emit("roomList", namespace.rooms)
    //         await getCountOfOnlineUser(namespace.endPoint,Array.from(namespace.rooms)[0])
    //     })
    // }
    // async getNamespacesConnection() {
    async createNamespacesConnection() {
        const namespacesList = await namespaceService.getNameSpaces()
        for (const namespace of namespacesList) {
            this.#io.of(`/${namespace.endPoint}`).on("connection", async socket => {
                socket.emit("roomList", namespace.rooms)
                // socket.join(namespace.rooms[0])
                // await this.getCountOfOnlineUser(namespace.endPoint, namespace.rooms[0])
              
                // socket.on("JoinRoom", async roomName => {
                //     const lastRoom = Array.from(socket.rooms)[1]
                //     if (lastRoom) {
                //         socket.leave(lastRoom)
                //     }
                //     socket.join(roomName)
                //     // console.log(namespace.endPoint, roomName);
                //     await this.getCountOfOnlineUser(namespace.endPoint, roomName)
                //     const roomInfo = await namespaceService.getRoomWithName(roomName)
                //     socket.emit("roomInfo", roomInfo)
                // })
            })
        }
    }
    async getCountOfOnlineUser(endPoint, roomName) {
        const onlineUser = await this.#io.of(`/${endPoint}`).in(roomName).allSockets();
         console.log(`onlineUsers: ${Array.from(onlineUser).length}`);
        this.#io.of(`/${endPoint}`).in(roomName).emit("OnlineUserCount", Array.from(onlineUser).length)

    }
}
module.exports = NameSpaceSocketHandler