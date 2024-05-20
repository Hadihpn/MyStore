const { Schema, model, Types } = require("mongoose");
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
    otp: { type: OTPSchema },
    bills: { type: [], default: [] },
    address: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String, default: "0" },
    Role: { type: String, default: "USER" },
    // Role: { type:MongoIDPattern },
    openToComment: { type: Boolean },
    accessToken: { type: String },
    refreshToken: { type: String },
    verifiedMobile: { type: Boolean, default: false, required: true },
    Courses: { type: [Types.ObjectId], default: [], ref: "course" }
}, { timestamps: true, toJSON: { virtuals: true } })

UserSchema.index({ userName: "text", email: "text", phone: "text" });

const UserModel = model("user", UserSchema);
module.exports = { UserModel };