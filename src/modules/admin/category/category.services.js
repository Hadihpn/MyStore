const autoBind = require("auto-bind");
const { CategoryModel } = require("./category.model");
const { CategoryMessage } = require("./category.messages");
const { isValidObjectId, Types } = require("mongoose");
const { types } = require("@hapi/joi");
const createHttpError = require("http-errors");
const slugify = require("slugify");

class CategoryService {
    #model
    constructor() {
        autoBind(this);
        this.#model = CategoryModel;
    }
    async creatCategory(categoryDto) {
        if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
            const existedCategory = await this.checkExistById(categoryDto.parent);
            categoryDto.parent = existedCategory._id;
            categoryDto.parents = [
                ... new Set(
                    ([existedCategory._id.toString()].concat(
                        existedCategory.parents.map(id => id.toString)
                    )).map(id => new Types.ObjectId(id))
                )
            ]
        }
        // const zzz = slugify(categoryDto.slug.toString().toLowerCase ());
        // console.log("zzz" + zzz);
        // const category = await this.#model.findOne({zzz})
        // console.log("category" + category);

        if (categoryDto.slug) {
            categoryDto.slug = slugify(categoryDto.slug.toString().toLowerCase ());
        }
        else {
            categoryDto.slug = slugify(categoryDto.name.toString().toLowerCase ())
        }
        await this.alreadyExistBySlug(categoryDto.slug)
        await this.#model.create(categoryDto);
    }
    async checkExistById(id) {
        const category = this.#model.findById(id)
        if (!category) throw new createHttpError.NotFound(CategoryMessage.WrongParentId)
        return category;
    }
    async alreadyExistBySlug(slug) {
        console.log(slug);
        const category = await this.#model.findOne({ slug:"firstcategoryslug" });
        console.log(category);
        if (category) throw new createHttpError.Conflict(CategoryMessage.alreadyExistedSlug)
        return false;
    }
}
module.exports = new CategoryService();