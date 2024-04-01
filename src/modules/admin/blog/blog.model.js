const { default: mongoose,model, Types } = require("mongoose");
const {  CommentSchema } = require("../comment/comment.model");

const BlogSchema = new mongoose.Schema({
    author: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    short_text: { type: String, required: false },
    text: { type: String, required: true },
    image: { type: String },
    tags: { type: [String], required: true, default: [] },
    category: { type: [Types.ObjectId], required: true, default: [] },
    comments: { type: [CommentSchema], default: [] },
    like: { type: [Types.ObjectId], ref: "users", default: [] },
    disLike: { type: [Types.ObjectId], ref: "users", default: [] },
    bookmark: { type: [Types.ObjectId], ref: "users", default: [] },
}, { versionKey: false, timestamps: true })

const BlogModel = model("Blog", BlogSchema);
module.exports = { BlogModel };