const autoBind = require("auto-bind");
const { CourseModel } = require("./course.model");
class CourseServices {
  #model
  constructor() {
    autoBind(this);
    this.#model = CourseModel
  }
  async createCourse(courseDto) {
    await this.#model.create(courseDto) 
  }
  async findCourse(query) {
    if (!query || query == "") return await this.#model.find()
    return await this.#model.find({
      $text:
        { $search: query }
    }).sort({ _id: -1 })
  }
  async findCourseById(_id){
    return await this.#model.findById({_id})
  }
}

module.exports = new CourseServices();
