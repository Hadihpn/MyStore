const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../constant/constantVar");
const createHttpError = require("http-errors");
const createPermissionSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسترسی صحیح نمیباشد")),
    description: Joi.string().empty().error(createHttpError.BadRequest("توضیح دسترسی صحیح نمیباشد")),
})
module.exports = {
    createPermissionSchema,
}