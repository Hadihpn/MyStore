const autoBind = require("auto-bind");
const { UserModel } = require("../../../models/user");
const createHttpError = require("http-errors");
const { randomInt } = require("crypto");
const { AuthMessage } = require("../../Messages/user/auth.messages");
const { unSupportedString } = require("../../../common/utils/function");
const { expiresOTP, yearPerSecond, ROLES } = require("../../../common/constant/constantVar");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const redisClient = require("../../../common/utils/init_redis");
const { rejects } = require("assert");
const { resolve } = require("path");

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
            const newUser = await this.#model.create({ phone, otp, Roles: [ROLES.USER] })
            return newUser;
        }
        //update otp 
        user.otp = otp;
        await user.save();

        return user

    }
    async checkOtp(phone, code) {
        const user = await this.getUserByPhone(phone);
        const now = new Date().getTime();
        if (!user || !user.otp.code || now > user.otp.expiresIn) throw new createHttpError.BadRequest(AuthMessage.OtpCodeExpired);
        if (user.otp.code != code) throw new createHttpError.BadRequest(AuthMessage.WrongOtpCode);
        const accessToken = await this.signToken({ phone });
        const refreshToken = await this.signRefreshToken({ phone });
        console.log(refreshToken);
        user.accessToken = accessToken;
        user.verifiedMobile = true;
        await user.save();
        return user;

    }
    async getUserByPhone(phone) {
        const user = await this.#model.findOne({ phone })
        return user
    }
    async getUserById(_id) {
        const user = await this.#model.findOne({ _id })
        return user
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
    async signRefreshToken(payload) {
        const newRefreshToken = await jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: "1y" })
        await this.saveOnRedis(payload.phone, newRefreshToken)
        return newRefreshToken;
    }
    async verifyRefreshToken(token) {
        const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
        console.log(data);
        if (data && data.phone) {
            const user = await this.getUserByPhone(data.phone);
            if (!user) throw new createHttpError.BadRequest(AuthMessage.NotFoundAccount)
            const refreshToken = await redisClient.get(user.phone);
            if (!refreshToken || refreshToken != token) throw new createHttpError.BadRequest(AuthMessage.NotFoundAccount)
            return user.phone
        }
        else {
            throw new createHttpError.Unauthorized(AuthMessage.UnAuthorize);
        }
    }
    async saveOnRedis(key, value) {
        await redisClient.SETEX(key, yearPerSecond, value)
    }
}
module.exports = new AuthService()