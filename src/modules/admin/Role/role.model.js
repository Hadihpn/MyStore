const { default: mongoose, Types, model } = require("mongoose");

const RoleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    permissions: { type: [Types.ObjectId],ref:"permissions", default:[]},
    description: { type: String, default:""},
},{
    toJSON:{
        virtuals:true
    }
})
RoleSchema.index({title:"text"});
// RoleSchema.virtual("imageURl").get(function(){
//     return this.images.map(image=>`${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/public/${image}`)
// })
const RoleModel = model("Role", RoleSchema);
module.exports = { RoleModel };