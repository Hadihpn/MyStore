const autoBind = require("auto-bind");
const { UserModel } = require("../../../models/user");
const createHttpError = require("http-errors");
const { randomInt } = require("crypto");
const { AuthMessage } = require("../../Messages/user/auth.messages");
const { unSupportedString } = require("../../../common/utils/function");
const { expiresOTP } = require("../../../common/constant/constantVar");
const jwt = require("jsonwebtoken");
class AuthService {
    #model
    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }

    async sendOtp(phone) {
        //check for user existence
        const user = await this.getUserByPhone(phone)
        //get time for check remained time
        const now = new Date().getTime();
        if (user && user.otp && now < user.otp.expiresIn) {
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired)
        };
        //create otp code
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + expiresOTP
        };
        // sign up user
        if (!user) {
            const newUser = await this.#model.create({ phone, otp })
            return newUser;
        }
        //update otp 
        user.otp = otp;
        await user.save();

        return user

    }
    async checkOtp(code, phone) {
        const user = await this.getUserByPhone(phone);
        const now = new Date().getTime();
        if (!user || !user.otp.code || now > user.otp.expiresIn) throw new createHttpError.BadRequest(AuthMessage.OtpCodeExpired);
        const token = this.signToken({ phone, id: user._id })
    }
    async getUserByPhone(phone) {
        return await this.#model.findOne({ phone })
    }
    async updateUser(phone, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (unSupportedString(objectData[key])) delete objectData[key]
        })
        const updatedUser = await this.#model.updateOne({ phone }, { $set: objectData })
        return updatedUser.modifiedCount;
    }
    async signToken(payload) {
        return await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
    }
}
module.exports = new AuthService()