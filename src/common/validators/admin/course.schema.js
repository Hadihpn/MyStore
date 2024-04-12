const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../constant/constantVar");
const createHttpError = require("http-errors");
const addProductSchema = Joi.object({
    title:Joi.string().min(3).max(20).error(createHttpError.BadRequest("عنوان  وارد شده معتبر نمی باشد")),
    short_text: Joi.string().min(3).max(30).error(createHttpError.BadRequest("خلاصه متن وارد شده صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن وارد شده صحیح نمیباشد")),
    tags: Joi.array().items(Joi.string().error(createHttpError.BadRequest(" برچسب وارد شده صحیح نمیباشد"))),
    category: Joi.string().pattern(MongoIDPattern).pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد")),
    teacher: Joi.string().pattern(MongoIDPattern).pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد")),
    price: Joi.number().error(createHttpError.BadRequest(" قیمت وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createHttpError.BadRequest(" تعداد وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createHttpError.BadRequest(" تخفیف وارد شده صحیح نمیباشد")),
    type:Joi.string().regex(/(free|paidFor)/i),
    // time:Joi.string().regex(/^(\d:\d:\d)$/i),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif)/).error(createHttpError.BadRequest(" فرمت تصویر وارد شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})
const editProductSchema = Joi.object({
    title:Joi.string().min(3).max(20).error(createHttpError.BadRequest("عنوان  وارد شده معتبر نمی باشد")),
    short_text: Joi.string().min(3).max(30).error(createHttpError.BadRequest("خلاصه متن وارد شده صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن وارد شده صحیح نمیباشد")),
    tags: Joi.array().items(Joi.string().error(createHttpError.BadRequest(" برچسب وارد شده صحیح نمیباشد"))),
    type: Joi.string().min(0).max(20).error(createHttpError.BadRequest("تایپ نمیتواند بیش از 20 ایتم باشد")),
    category: Joi.string().pattern(MongoIDPattern).pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد")),
    supplier: Joi.string().pattern(MongoIDPattern).pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد")),
    price: Joi.number().error(createHttpError.BadRequest(" قیمت وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createHttpError.BadRequest(" تعداد وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createHttpError.BadRequest(" تخفیف وارد شده صحیح نمیباشد")),
    type:Joi.string().regex(/(virutal|physical)/i),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif)/).error(createHttpError.BadRequest(" فرمت تصویر وارد شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})
module.exports = {
    addProductSchema,
    editProductSchema
}