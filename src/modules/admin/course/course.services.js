const autoBind = require("auto-bind");
const { CourseModel } = require("./course.model");
const createHttpError = require("http-errors");
class CourseServices {
  #model
  constructor() {
    autoBind(this);
    this.#model = CourseModel
  }
  //#region  Course
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
  async findCourseById(_id) {
    const course = await this.#model.findById({ _id })
    return 
  }
  //#endregion

  //#region  Chapter
  async addChapter(chapterDto) {
    const course = await this.findCourseById(chapterDto?.id)
    if (!course) throw new createHttpError.NotFound("the course does not found")
    return await this.#model.updateOne(
      { _id: chapterDto.id },
      {
        $push:
          { chapters: { title: chapterDto.title, text: chapterDto.text, episodes: [] } }
      })
  }
  async getChaptersOfCourse(_id) {
    
    const course =await this.#model.findOne({ _id },{chapters:1})
    if(!course) throw createHttpError.NotFound("cannot find any course")
    return (course.chapters) ? course.chapters : [];
  }
  //#endregion
}

module.exports = new CourseServices();
