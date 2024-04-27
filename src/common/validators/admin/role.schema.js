const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../constant/constantVar");
const createHttpError = require("http-errors");
const createRoleSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان نقش صحیح نمیباشد")),
    description: Joi.string().min(3).max(30).error(createHttpError.BadRequest("توضیحات نقش صحیح نمیباشد")),
    permissions: Joi.array().items(Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" سطح دسترسی وارد شده صحیح نمیباشد"))),
})
module.exports = {
    createRoleSchema,
}