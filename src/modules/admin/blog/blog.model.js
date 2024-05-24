const { default: mongoose, model, Types } = require("mongoose");
const { CommentSchema } = require("../comment/comment.model");
const { QuestionSchema } = require("../PublicModel/public.schema");

const BlogSchema = new mongoose.Schema({
    author: { type: Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    short_text: { type: String, required: false },
    text: { type: String, required: true },
    image: { type: String },
    tags: { type: [String], required: true, default: [] },
    category: { type: [Types.ObjectId], ref: "Category", required: true, default: [] },
    comments: { type: [CommentSchema], ref: "user", default: [] },
    questions: { type: [QuestionSchema], ref: "user", default: [] },
    likes: { type: [Types.ObjectId], ref: "user", default: [] },
    disLikes: { type: [Types.ObjectId], ref: "user", default: [] },
    bookmarks: { type: [Types.ObjectId], ref: "user", default: [] },
}, { versionKey: false, id: false, toJSON: { virtuals: true } })

BlogSchema.virtual("author_detail", {
    ref: "user",
    localField: "author",
    foreignField: "_id"
})
BlogSchema.virtual("category_detail", {
    ref: "Category",
    localField: "category",
    foreignField: "_id"
})
BlogSchema.virtual("imageUrl").get(function () {
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/public/${this.image}`
})
function autoPopulate(next){
    this.populate([{path:"author"},{path:"category"},{path:"bookmarks"}]);
    next()
}
BlogSchema.pre("find",autoPopulate).pre("findOne", autoPopulate);
const BlogModel = model("Blog", BlogSchema);
module.exports = { BlogModel };