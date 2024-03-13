const autoBind = require("auto-bind");
const { UserModel } = require("../../../models/user");
const createHttpError = require("http-errors");
const {randomInt} = require("crypto");
const { AuthMessage } = require("../../Messages/user/auth.messages");
class AuthService {
    #model
    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }

    async sendOtp(phone) {
        const user = await findUserByPhone(phone)
        const now = new Date().getTime();
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + (1000 * 60 * 2)
        };
        if (!user) { 
            user = await this.#model.create({ phone ,otp}) 
            return user;
        }
        if (user.otp && now < user.otp.expiresIn) {
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired)
        };
        user.otp = otp;
        await user.save();
        
        return user

    }

    async findUserByPhone(phone) {
        return await this.#model.findOne({ phone })
    }
}
module.exports = new AuthService()