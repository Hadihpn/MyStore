const autoBind = require("auto-bind");
const { CourseModel } = require("./course.model");
class CourseServices {
  #model
  constructor() {
    autoBind(this);
    this.#model =  CourseModel
  }
}

module.exports = new CourseServices();
