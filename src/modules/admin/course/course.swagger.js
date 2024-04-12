/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCourse:
 *              type: object
 *              required:
 *                  -   title
 *              prameters:
 *                  title:
 *                      type: string 
 *                      description: title of course 
 */

/**
 * @swagger
 *  /admin/course/:
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