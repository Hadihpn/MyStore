const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    otp: {
        type: String, default: {
            code: 0,
            expires: new Date().getDate() + 120
        }
    },
    bills: { type: [], default: [] },
    address: { type: [],default:[] },
    discount: { type: Number, default: 0 },
    birthday:{type:String},
    roles:{type:[String],default:["USER"]}
})

const UserModel = model("user", UserSchema);
module.exports = { UserModel };