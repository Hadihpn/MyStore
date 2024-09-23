const { default: mongoose, Schema, Types ,model} = require("mongoose")

const MessageSchema = new Schema({
    sender: { type: Types.ObjectId, ref: "user", required: true },
    message: { type: String },
    dateTime: { type: Number }
}, { timestamps: { createdAt: true } })
const RoomSchema = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    messages: { type: [MessageSchema], default: [] },

})
const ConversationSchame = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    endPoint: { type: String },
    rooms: { type: [RoomSchema], default: [] }
})

const ConversationModel = model("Conversation", ConversationSchame)
module.exports = {
    ConversationModel
}