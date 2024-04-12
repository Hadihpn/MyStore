const { default: mongoose, Types, model } = require("mongoose");
const { CommentSchema } = require("../comment/comment.model");
const Episode = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String },
    type: { type: Boolean, default: false },
})
const Chapter = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    episodes: { type: [Episode], default: [] },
})
const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
    category: { type: mongoose.Types.ObjectId, reg: "category", required: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, default: "free", required: true },//رایگان یا پولی
    time: { type: String, default: "00:00:00" },
    teacher: { type: mongoose.Types.ObjectId, required: true },
    chapters: { type: [Chapter], default: [] },
    students: { type: [Types.ObjectId], default: [], ref: "user" }
})
CourseSchema.index({ title: "text", short_text: "text" })
const CourseModel = model("Course", CourseSchema);
module.exports = { CourseModel };