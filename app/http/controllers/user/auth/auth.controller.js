const createHttpError = require("http-errors")
const { authSchema } = require("../../../validators/user/auth.schema")
const autoBind = require("auto-bind");
const authServices = require("../../../services/user/auth.services");
class UserAuthController {
    #services
    constructor() {
        autoBind(this);
        this.#services = authServices;
    }
    async login(req, res, next) {
        try {
            const {phone} = req.body;
            await authSchema.validateAsync(req.body)
            const result = await this.#services.sendOtp(phone)
            // console.log(result);
            return res.status(200).send("شما با موفقیت وارد شدید"+result)
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
}

module.exports = new UserAuthController()