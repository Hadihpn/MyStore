/**
 * @swagger
 *  components:
 *      schemas:
 *          CourseType:
 *              type: string
 *              enum:
 *                  -   free 
 *                  -   paidFor 
 *          EpisodeType:
 *              type: string
 *              enum:
 *                  -   unlock 
 *                  -   lock 
 */ 
/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4sv68cdded54sw928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text and describe of course"
 *                                  time:
 *                                      type: string
 *                                      example: "01:22:34"
 *                                  price:
 *                                      type: integer
 *                                      example: 250,000
 *                                  discount:
 *                                      type: interger
 *                                      example: 20
 *                                  studendtCount:
 *                                      type: integer
 *                                      example: 340
 *                                  teacher:
 *                                      type: string
 *                                      example: "hadihpn"
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          addCourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *                  -   price
 *                  -   teacher
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of course
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  price:
 *                      type: string
 *                      description: the price
 *                  type:
 *                      $ref: '#/components/schemas/CourseType'
 *                      description: the type
 *                  category:
 *                      type: string
 *                      description: the id of category 
 *                  teacher:
 *                      type: string
 *                      description: the id of teacher 
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: the index picture of course
 *          editCourse:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of course
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  price:
 *                      type: string
 *                      description: the price
 *                  type:
 *                      $ref: '#/components/schemas/CourseType'
 *                      description: the type
 *                  category:
 *                      type: string
 *                      description: the id of category 
 *                  teacher:
 *                      type: string
 *                      description: the id of teacher 
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: the index picture of course
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          addChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *                  -   text
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the id of course 
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                  text:
 *                      type: string
 *                      description: the text of course
 *          editChapter:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  text:
 *                      type: string
 *                      description: the text of course
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          addEpisode:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   chapterId
 *                  -   title
 *                  -   type
 *                  -   video
 *              properties:
 *                  courseId:
 *                      type: string
 *                      description: the id of course
 *                  chapterId:
 *                      type: string
 *                      description: the id of chapter
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  type:
 *                      $ref: '#/components/schemas/EpisodeType'
 *                      description: the type of episode lock or unlock
 *                  video:
 *                      type: string
 *                      description: the video of episode
 *                      format: binary
 *          editEpisode:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                  type:
 *                      $ref: '#/components/schemas/EpisodeType'
 *                      description: the type of episode lock or unlock
 */
/**
 * @swagger
 *  /admin/course/:
 *      get:
 *          tags: [ course(AdminPanel)]
 *          summary: get all courses
 *          parameters:
 *              -   in: query 
 *                  name: search 
 *                  type: string 
 *                  description: text for search in title 
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

/**
 * @swagger
 *  /admin/course/{id}:
 *      get:
 *          summary: get course by ID and populate this field 
 *          tags: [ course(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/course/addCourse:
 *      post:
 *          tags: [ course(AdminPanel)]
 *          summary: create course document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/addCourse'
 *          responses:
 *              201:
 *                  description: created
 */
/**
 * @swagger
 *  /admin/course/updateCourse/{id}:
 *      patch:
 *          tags: [ course(AdminPanel)]
 *          summary: create course document
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/editCourse'
 *          responses:
 *              201:
 *                  description: created
 */

/**
 * @swagger
 *  /admin/course/delete/{id}:
 *      delete:
 *          summary: remove course by ID 
 *          tags: [ course(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */


//#region chapter
/**
 * @swagger
 *  /admin/course/addChapter:
 *      put:
 *          tags: [ course(AdminPanel)]
 *          summary: create chapter document
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addChapter'
 *          responses:
 *              200:
 *                  description: created
 */
/**
 * @swagger
 *  /admin/course/chapter/{id}:
 *      get:
 *          summary: get chpater by ID 
 *          tags: [ course(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/course/chaptersOfCourse/{id}:
 *      get:
 *          summary: get chpaters of course by ID and populate this field 
 *          tags: [ course(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/course/editChapter/{id}:
 *      patch:
 *          tags: [ course(AdminPanel)]
 *          summary: update  chapter document by id 
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/editChapter'
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/course/deleteChapter/{id}:
 *      patch:
 *          tags: [ course(AdminPanel)]
 *          summary: delete chpater by chapterId 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
//#endregion

//#region episode
/**
 * @swagger
 *  /admin/course/addEpisode:
 *      post:
 *          tags: [ course(AdminPanel)]
 *          summary: create new episode document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/addEpisode'
 *          responses:
 *              200:
 *                  description: created
 */
/**
 * @swagger
 *  /admin/course/episode/{id}:
 *      get:
 *          summary: get episode by ID 
 *          tags: [ course(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/course/episodesOfChapter/{id}:
 *      get:
 *          summary: get episodes of chapter by ID and populate this field 
 *          tags: [ course(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/course/editEpisode/{id}:
 *      patch:
 *          tags: [ course(AdminPanel)]
 *          summary: create new episode document
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/editEpisode'
 *          responses:
 *              200:
 *                  description: created
 */
/**
 * @swagger
 *  /admin/course/editEpisodes/{id}:
 *      patch:
 *          tags: [ course(AdminPanel)]
 *          summary: update  episode  by id 
 *          consumes: 
 *              -   multipart/form-data
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/addEpisode'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/course/deleteEpisode/{id}:
 *      delete:
 *          tags: [ course(AdminPanel)]
 *          summary: delete episode by episodeId 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
//#endregion