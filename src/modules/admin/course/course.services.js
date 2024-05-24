const autoBind = require("auto-bind");
const { CourseModel } = require("./course.model");
const createHttpError = require("http-errors");
const { CourseMessage } = require("./course.messages");
const { deleteFileInPublic, copyObject } = require("../../../common/utils/function");
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
  async updateCourse(id, data) {
    return await this.#model.updateOne({ _id: id }, { $set: data })
  }
  async findCourse(findQuery) {
    if (!findQuery || findQuery == "" ) return await this.#model.find();
    return await this.#model.find({
      $text:
        { $search: findQuery }
    }).populate([{path:'teacher'},{path:"category"}]).sort({ _id: -1 })
  }
  async getCourseByQuery(findQuery){
    if (!findQuery || findQuery == "" ) return await this.#model.find()
    return await this.#model.find(findQuery)
  }
  async getCourseById(_id) {
    const course = await this.#model.findById({ _id })
    return course
  }
  async checkExist(_id) {
    return await this.#model.exists({ _id: _id })
}
  async checkExistRepliedComment(commentId) {
    const course = await this.#model.findOne({ "comments._id": commentId }, { "comments.$": 1 });
    if (course) return true;
    return false;
}
async checkExistRepliedQuestion(questionId) {
    const course = await this.#model.findOne({ "questions._id": questionId }, { "questions.$": 1 });
    if (course) return true;
    return false;
}
async addCourseComment(courseId, comment) {
  return await this.#model.updateOne({ _id: courseId },
      {
          $push: {
              comments: {
                  user: comment.user,
                  text: comment.text,
                  show: comment.show,
                  // replyTo: comment.replyTo
              }
           
          }
      });
}
async likeAndDisLikCourse(courseId, userId) {
  const likedCourse = await this.getCourseByQuery({ _id: courseId, likes: userId })
  const disLikedCourse = await this.getCourseByQuery({ _id: courseId, disLikes: userId })
  let message = "";
  if (likedCourse && disLikedCourse) {
      await this.#model.updateOne({ _id: courseId },
          { $pull: { disLikes: userId } }
      )
      message = "you like this course"
  }
  else {
      if (likedBlog) {
          await this.#model.updateOne({ _id: courseId },
              {
                  $pull: { likes: userId },
                  $push: { disLikes: userId }
              }

          )
          message = "you disLike this course"
      } else {
          await this.#model.updateOne({ _id: courseId },
              {
                  $pull: { disLikes: userId },
                  $push: { likes: userId }
              }

          )
          message = "you Like this course"
      }
      return message
  }
}
async bookmarkCourse(courseId, userId) {
  const bookmarkedCourse = await this.getCourseById({ _id: courseId, bookmarks: userId })
  let message = "";
  if (bookmarkedCourse) {
      await this.#model.updateOne({ _id: courseId },
          { $pull: { bookmarks: userId } }
      )
      message = "the Course added to bookmark"
  }
  else {
      await this.#model.updateOne({ _id: courseId },
          {
              $push: { bookmarks: userId }
          }

      )
      message = "the Course removed from bookmark"

  }
   return message
}
  //#endregion

  //#region  Chapter
  async addChapter(chapterDto) {
    console.log(chapterDto.id)
    const course = await this.getCourseById(chapterDto?.id)
    if (!course) throw new createHttpError.NotFound("the course does not found")
    //**** chapterDto.id == courseId
    return await this.#model.updateOne(
      { _id: chapterDto.id },
      {
        $push:
          { chapters: { title: chapterDto.title, text: chapterDto.text, episodes: [] } }
      })
  }
  async getChapterById(id) {
    const chapter = await this.#model.findOne({ "chapters._id": id }, { "chapters.$": 1 })
    if (!chapter) throw createHttpError.NotFound("cannot find any chapter")
    return chapter;
  }
  async getChaptersOfCourse(_id) {

    const course = await this.#model.findOne({ _id }, { chapters: 1 })
    if (!course) throw createHttpError.NotFound("cannot find any course")
    return (course.chapters) ? course.chapters : [];
  }
  async updateChapter(chapterDto) {
    const chapter = await this.getChapterById(chpaterDto.id)
    if (!chapter) throw new createHttpError.NotFound();
    const updateChapterResult = await this.#model.updateOne({ "chapters._id": id }, {
      $set: {
        "chapters.$": chapterDto.data
      }
    })
    return updateChapterResult
  }
  async deleteChapter(id) {
    const chapter = await this.#model.findOne({ "chapters._id": id }, { "chapters.$": 1 })

    const episodes = chapter.chapters[0].episodes;
    if (!Array.isArray(episodes) && episodes.length > 0) throw createHttpError.NotFound(CourseMessage.notEmtpyChapter);
    const result = await this.#model.updateOne({ "chapters._id": id }, {
      $pull: {
        chapters: {
          _id: id
        }
      }
    })
    return result;
  }
  //#endregion

  //#region Episode
  async addEpisode(episodeDto) {
    const course = await this.getCourseById(episodeDto?.courseId)
    if (!course) throw new createHttpError.NotFound("the course does not found")
    //**** chapterDto.id == courseId
    return await this.#model.updateOne(
      { _id: episodeDto.courseId, "chapters._id": episodeDto.chapterId },
      {
        $push:
          { "chapters.$.episodes": { title: episodeDto.title, text: episodeDto.text, time: episodeDto.time, videoAddress: episodeDto.videoAddress } }
      })
  }
  async getEpisodeById(episodeId) {
    const episode = await this.#model.findOne({ "chapters.episodes._id": episodeId })
      .populate("chapters.episodes") // Populate the nested episodes within chapters
      .then((course) => {

        // Find the chapter containing the episode
        const chapter = course.chapters.find((chap) =>
          chap.episodes.some((ep) => ep._id.toString() === episodeId)
        );
        // Find the episode within the chapter
        const episode = chapter.episodes.find(
          (ep) => ep._id.toString() === episodeId
        );

        if (!episode) {
          console.log("Episode not found");
          // Handle the case where the episode is not found
          return;
        }

        return episode
        // Use the retrieved episode (e.g., return it in your API response)
      })
      .catch((err) => {
        console.error("Error fetching course:", err);
        // Handle any errors (e.g., return an error response)
      });
    return episode;
  }
  async updateEpisode(episodeDto) {
    const episode = copyObject(await this.getEpisodeById(episodeDto.id));
    const newEpisode = {
      ...episode,
      ...episodeDto.data
    }

    console.log(newEpisode);

    const updateChapterResult = await this.#model.updateOne({ "chapters.episodes._id": episodeDto.id }, {
      $set: { "chapters.$.episodes": newEpisode }
    })
    return updateChapterResult
  }
  async deleteEpisode(episodeId) {
    //get the episode to return videoAddress for deleting
    const episode = await this.getEpisodeById(episodeId)
    const address = episode.videoAddress
    const result = await this.#model.updateOne({ "chapters.episodes._id": episodeId }, {
      $pull: {
        "chapters.$.episodes": {
          _id: episodeId
        }
      }
    })
    // deleteFileInPublic(episode.videoAddress)

    // console.log("service "+address);
    return { result, address };
  }
  //#endregion
}

module.exports = new CourseServices();
