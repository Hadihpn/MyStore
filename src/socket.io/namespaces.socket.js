const {
  ConversationModel,
} = require("../modules/client/chat/conversation.model");
const namespaceController = require("../modules/client/chat/namespace/namespace.controller");
const namespaceService = require("../modules/client/chat/namespace/namespace.service");

class NameSpaceSocketHandler {
  #io;
  constructor(io) {
    this.#io = io;
  }
  initConnection() {
    this.#io.on("connection", async (socket) => {
      const namespacesList = await namespaceService.getNameSpaces();
      socket.emit("namespacesList", namespacesList);
    });
  }
  async createNamespacesConnection() {
    const namespacesList = await namespaceService.getNameSpaces();
    await this.getCountOfOnlineUser(namespacesList[0].endPoint,namespacesList[0].rooms[0])
    this.#io
      .of(`/${namespacesList[0].endPoint}`)
      .on("connection", async (socket) => {
        socket.emit("roomList", namespacesList[0].rooms);
      
      });
    for (const namespace of namespacesList) {
      this.#io.of(`/${namespace.endPoint}`).on("connection", async (socket) => {
        socket.emit("roomList", namespace.rooms);
        socket.on("JoinRoom", async (roomName) => {
          const lastRoom = Array.from(socket.rooms)[1];
          if (lastRoom) {
            socket.leave(lastRoom);
          }
          socket.join(roomName);
          // console.log(namespace.endPoint, roomName);
          await this.getCountOfOnlineUser(namespace.endPoint, roomName);
          const roomInfo = await namespaceService.getRoomWithName(roomName);
          socket.emit("roomInfo", roomInfo);
          this.getNewMessage(socket);
          socket.on("discsonnect", async () => {
            await this.getCountOfOnlineUser(namespace.endPoint, roomName);
          });
        });
      });
    }
  }
  async getCountOfOnlineUser(endPoint, roomName) {
    const onlineUser = await this.#io
      .of(`/${endPoint}`)
      .in(roomName)
      .allSockets();
    // console.log(`onlineUsers: ${Array.from(onlineUser).length}`);
    this.#io
      .of(`/${endPoint}`)
      .in(roomName)
      .emit("OnlineUserCount", Array.from(onlineUser).length);
  }
  getNewMessage(socket) {
    socket.on("newMessage", async (data) => {
      const { message, roomName, endPoint,sender } = data;
      console.log(data);
      
      await ConversationModel.updateOne(
        { endPoint, "rooms.name": roomName },
        {
          $push: {
            "rooms.$.messages": {
                sender,
                message,
                dateTime:Date.now()
            },
          },
        }
      );
    });
  }
}
module.exports = NameSpaceSocketHandler;
