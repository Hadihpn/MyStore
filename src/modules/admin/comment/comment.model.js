const { Schema, model, Types } = require("mongoose");

const CommentSchema = new Schema({
    user: { type: Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    parent: { type: [Types.ObjectId],ref:"Comment", default: [] },
    show: { type: Boolean, default: false },
    openToComment: { type: Boolean, default: true }
}, { timestamps: { createdAt: true } })


const CommentModel = model("Comment", CommentSchema);
module.exports = { CommentSchema, CommentModel }; 