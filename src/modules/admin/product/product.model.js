const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], required: true },
    category: { type: mongoose.Types.ObjectId, reg: "category", required: true },
    comments: { type: [], default:[] },
    likes: { type: [mongoose.Types.ObjectId], default:[] },
    dislikes: { type: [mongoose.Types.ObjectId], default:[] },
    bookmarks: { type: [mongoose.Types.ObjectId], default:[]  },
    price: { type: Number, default:0 },
    discount: { type: Number, default:0 },
    count: { type: Number },
    type: { type: String, required: true },//مجازی یا فیزیکی
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, required: true },
    feature: { type: Object, default:{
        length:"",
        height:"",

    } },
})
const ProductModel = model("Product", ProductSchema);
module.exports = { ProductModel };