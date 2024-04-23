const { default: mongoose, Types, model } = require("mongoose");
const { CommentSchema } = require("../comment/comment.model");
const { required } = require("@hapi/joi");
const Episode = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, default: "unlock" },
    type: { type: String, default: false },
    videoAddress: { type: String, required:true },
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
    category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, default: "free", required: true },//رایگان یا پولی
    time: { type: String, default: "00:00:00" },
    teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    chapters: { type: [Chapter], default: [] },
    students: { type: [Types.ObjectId], default: [], ref: "user" }
})

function autoPopulate(next) {
    this.populate([{ path: "teacher", select: { phone: 1 } }
        , { path: "category", select: { title: 1 } }])
    next()
}
CourseSchema.pre("find", autoPopulate).pre("findOne", autoPopulate)
CourseSchema.index({ title: "text", short_text: "text" })
const CourseModel = model("Course", CourseSchema);
module.exports = { CourseModel };