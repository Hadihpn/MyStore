const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../constant/constantVar");
const createHttpError = require("http-errors");
const createBlogSchema = Joi.object({
    author: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest("نویسنده را بدرستی انتخاب نمایید")),
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    short_text: Joi.string().min(3).max(30).error(createHttpError.BadRequest("خلاصه متن وارد شده صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن وارد شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیش از 20 ایتم باشد")),
    category: Joi.array().items(Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد"))),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif)/).error(createHttpError.BadRequest(" فرمت تصویر وارد شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})
const editBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    short_text: Joi.string().min(3).max(30).error(createHttpError.BadRequest("خلاصه متن وارد شده صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن وارد شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیش از 20 ایتم باشد")),
    category: Joi.array().items(Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد"))),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif)/).error(createHttpError.BadRequest(" فرمت تصویر وارد شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})
module.exports = {
    createBlogSchema,
    editBlogSchema
}