const { default: mongoose, Types, model } = require("mongoose");
const { CommentSchema } = require("../comment/comment.model");

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    comments: { type: [CommentSchema], ref: "user", default: [] },
    questions: { type: [CommentSchema], ref: "user", default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, default: "فیزیکی" },//مجازی یا فیزیکی
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    feature: {
        type: Object, default: {
            length: "",
            height: "",
            width: "",

        }
    },
},{
    toJSON:{
        virtuals:true
    }
})
function autoPopulate(next){
    this.populate([{path:"supplier",select:{phone:1,_id:0,userName:1}},{path:"category",select:{title:1}}]);
    next()
}
ProductSchema.pre("find",autoPopulate).pre("findOne", autoPopulate);
ProductSchema.index({text:"text",title:"text",short_text:"text"});
ProductSchema.virtual("imageURl").get(function(){
    return this.images.map(image=>`${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/public/${image}`)
})
const ProductModel = model("Product", ProductSchema);
module.exports = { ProductModel };