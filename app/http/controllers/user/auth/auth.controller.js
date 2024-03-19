const createHttpError = require("http-errors")
const { checkOTPSchema, getOTPSchema } = require("../../../validators/user/auth.schema")
const autoBind = require("auto-bind");
const authServices = require("../../../services/user/auth.services");
const { AuthMessage } = require("../../../Messages/user/auth.messages");
require("dotenv").config();
const jwt = require("jsonwebtoken");

class UserAuthController {
    #services
    constructor() {
        autoBind(this);
        this.#services = authServices;
    }
    async login(req, res, next) {
        try {
            const { phone } = req.body;
            await getOTPSchema.validateAsync(req.body)
            const result = await this.#services.sendOtp(phone)
            // console.log(result);
            return res.status(200).send(result)
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }
    async sendOtp(req, res, next) {
        try {
            const mobile = req.body;
        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req, res, next) {
        try {
            const { phone, code } = req.body;
            await checkOTPSchema.validateAsync(req.body);
            const user = await this.#services.checkOtp(phone, code);
            return res.cookie("accessToken", user.accessToken, {
                httpOnly: true,
                path: "/"
            }).status(200).json({
                message: AuthMessage.LoginInSuccesfully,
                token: user.accessToken
            })
        } catch (error) {
            next(error)
        }

    }
}

module.exports = new UserAuthController()