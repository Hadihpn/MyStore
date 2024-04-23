const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../constant/constantVar");
const createHttpError = require("http-errors");
const addCourseSchema = Joi.object({
    title: Joi.string().min(3).max(20).error(createHttpError.BadRequest("عنوان  وارد شده معتبر نمی باشد")),
    short_text: Joi.string().min(3).max(30).error(createHttpError.BadRequest("خلاصه متن وارد شده صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن وارد شده صحیح نمیباشد")),
    tags: Joi.array().items(Joi.string().error(createHttpError.BadRequest(" برچسب وارد شده صحیح نمیباشد"))),
    category: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد")),
    teacher: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد")),
    price: Joi.number().error(createHttpError.BadRequest(" قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createHttpError.BadRequest(" تخفیف وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(free|paidFor)/i),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif)/).error(createHttpError.BadRequest(" فرمت تصویر وارد شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})
const editCourseSchema = Joi.object({
    title: Joi.string().min(3).max(20).error(createHttpError.BadRequest("عنوان  وارد شده معتبر نمی باشد")),
    short_text: Joi.string().min(3).max(30).error(createHttpError.BadRequest("خلاصه متن وارد شده صحیح نمیباشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن وارد شده صحیح نمیباشد")),
    tags: Joi.array().items(Joi.string().error(createHttpError.BadRequest(" برچسب وارد شده صحیح نمیباشد"))),
    type: Joi.string().min(0).max(20).error(createHttpError.BadRequest("تایپ نمیتواند بیش از 20 ایتم باشد")),
    category: Joi.string().pattern(MongoIDPattern).pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد")),
    supplier: Joi.string().pattern(MongoIDPattern).pattern(MongoIDPattern).error(createHttpError.BadRequest(" دسته بندی وارد شده صحیح نمیباشد")),
    price: Joi.number().error(createHttpError.BadRequest(" قیمت وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createHttpError.BadRequest(" تعداد وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createHttpError.BadRequest(" تخفیف وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(virutal|physical)/i),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.gif)/).error(createHttpError.BadRequest(" فرمت تصویر وارد شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})
const addChapterSchema = Joi.object({
    id: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" کد دوره وارد شده صحیح نمیباشد")),
    title: Joi.string().min(3).max(100).error(createHttpError.BadRequest("عنوان  وارد شده معتبر نمی باشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن وارد شده صحیح نمیباشد")),

})
const addEpisodeSchema = Joi.object({
    courseId: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" کد دوره وارد شده صحیح نمیباشد")),
    chapterId: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(" کد فصل  وارد شده صحیح نمیباشد")),
    title: Joi.string().min(3).max(100).error(createHttpError.BadRequest("عنوان  وارد شده معتبر نمی باشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن وارد شده صحیح نمیباشد")),
    type: Joi.string().regex(/(unlock|lock)/i),
    // time: Joi.string().regex(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}|/i),//00:06:03
    filename: Joi.string().pattern(/(\.mp4|\.mkv|\.gif)/).error(createHttpError.BadRequest(" فرمت فیلم وارد شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})

module.exports = {
    addCourseSchema,
    editCourseSchema,
    addChapterSchema,
    addEpisodeSchema
}