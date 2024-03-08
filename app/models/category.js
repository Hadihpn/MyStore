const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    title: { type: String, required: true }
})

const CategoryModel = model("category", CategorySchema);
module.exports = { CategoryModel };