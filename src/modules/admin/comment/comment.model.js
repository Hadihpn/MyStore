const { Schema, model, Types } = require("mongoose");

const CommentSchema = new Schema({
    writer: { type: Types.ObjectId, ref: "users", required: true },
    title: { type: String, required: false },
    text: { type: String, required: true },
    date: { type: Date,default:new Date().getTime() },
    parent: { type: [Types.ObjectId], default: [] },
    situation: { type: Boolean, default: false }
})


const CommentModel = model("Comment", CommentSchema);
module.exports = { CommentSchema, CommentModel }; 