const { Schema, model, Types } = require("mongoose");

// const AnswerSchema = new Schema({
//     user: { type: Types.ObjectId, ref: "user", required: true },
//     text: { type: String, required: true },
//     show: { type: Boolean, default: false },
// }, { timestamps: { createdAt: true } })
const CommentSchema = new Schema({
    user: { type: Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    // parent: { type: [AnswerSchema], default: [] },
    replyTo: { type: Types.ObjectId, default: [] },
    show: { type: Boolean, default: false },
    // openToComment: { type: Boolean, default: true }
}, { timestamps: { createdAt: true } })


const CommentModel = model("Comment", CommentSchema);
module.exports = { CommentSchema, CommentModel }; 