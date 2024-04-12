/**
 * @swagger
 *  components:
 *      schemas:
 *          CourseType:
 *              type: string
 *              enum:
 *                  -   free 
 *                  -   paidFor 
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
 *                  -   time
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
 *                      description: the id of supplier 
 *                  image:
 *                      type: file
 *                      description: the index picture of course
 */
/**
 *          CourseUpdate:
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
 *                  category:
 *                      type: array
 *                      items: 
 *                          type: string
 *                      description: the id of category for foreinField in course
 *                  type:
 *                      $ref: '#/components/schemas/CourseType'
 *                      description: the type
 *                  image:
 *                      type: file
 *                      description: the index picture of course
 */
/**
 * @swagger
 *  /admin/course:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get all course
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: the title , shortText or text of course
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/course/addCourse:
 *      post:
 *          tags: [ Course(AdminPanel)]
 *          summary: create Course document
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