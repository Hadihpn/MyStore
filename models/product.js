const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    title: { type: String, required: true },
    short_desc: { type: String, required: true },
    total_desc: { type: String, required: true },
    image: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: [Types.ObjectId], default: [] },
    dislike: { type: [Types.ObjectId], default: [] },
    bookmark: { type: [Types.ObjectId], default: [] },
    price: { type: Number,default:0},
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true },
    time: { type: String},
    format: { type: String},
    teacher: { type: Types.ObjectId},
    feature: {
        type: Object, required: false, default: {
            length: "",
            height: "Number",
            width: "",
            weight: "",
            color:[],
            model:[],
            madein:""
        }
    },
})

const ProductModel = model("product", ProductSchema);
module.exports = { ProductModel };