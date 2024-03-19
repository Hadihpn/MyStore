const { Schema, model } = require("mongoose");
const OTPSchema = new Schema({
    code: { type: String, required: false, default: undefined },
    expiresIn: { type: Number, required: false, default: 0 }
})
const UserSchema = new Schema({
    firstName: { type: String, },
    lastName: { type: String },
    userName: { type: String, lowercase: true },
    phone: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    // otp: {
    //     type: String, default: {
    //         code: 0,
    //         expires: new Date().getDate() + 120
    //     }
    // },
    otp: { type: OTPSchema },
    bills: { type: [], default: [] },
    address: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String, default: "0" },
    roles: { type: [String], default: ["USER"] },
    accessToken: { type: String },
    verifiedMobile: { type: Boolean, default: false, required: true },
})

const UserModel = model("user", UserSchema);
module.exports = { UserModel };