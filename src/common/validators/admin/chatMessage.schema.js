const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../constant/constantVar");
const createHttpError = require("http-errors");
const createChatMessageSchema = Joi.object({
    sender: Joi.string().pattern(MongoIDPattern).ob.error(createHttpError.BadRequest("ادرس کاربر صحیح نمیباشد")),
    message: Joi.string().min(3).max(30).error(createHttpError.BadRequest("متنی را وارد کنید")),
    datetime: Joi.string().min(8).max(30).error(createHttpError.BadRequest("تاریخ را بدرستی را وارد کنید")),
})
module.exports = {
    createChatMessageSchema,
}