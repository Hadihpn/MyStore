const {Schema,model, Types} = require("mongoose");

const CommentSchema = new Schema({
    author:{type:Types.ObjectId,required:true},
    title:{type:String,required:true},
    text:{type:String,required:true},
    image:{type:String,required:true},
    tags:{type:[String],default:[]},
    category:{type:Types.ObjectId,required:true},
    comments:{type:[],default:[]}
})

const CommentModel = model("comment",CommentSchema);
module.exports = {CommentModel};