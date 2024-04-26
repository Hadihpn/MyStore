const { default: mongoose, Types, model } = require("mongoose");
const { CommentSchema } = require("../comment/comment.model");

const PermissionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default:""},
},{
    toJSON:{
        virtuals:true
    }
})
PermissionSchema.index({title:"text"});
// PermissionSchema.virtual("imageURl").get(function(){
//     return this.images.map(image=>`${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/public/${image}`)
// })
const PermissionModel = model("Permission", PermissionSchema);
module.exports = { PermissionModel };