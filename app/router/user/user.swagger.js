/** 
 * @swagger
 *  tags:
 *      name: Indexpage
 *      description: User routes
 */
/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user-auth section
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *        LoginUser:
 *          type: object  
 *          required:
 *              - phone
 *          properties:
 *              phone:
 *                  type: string  
 *              
 */
/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: create new option for category
 *      description: one time password
 *      tags:
 *          -   User-Authentication
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUser'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUser'
 *      responses:
 *          201: 
 *              description: created
 *          400: 
 *              description: bad request
 *          401: 
 *              description: unAuthorize
 *          500: 
 *              description: InternalServer Error
 */
/**
/**
 * @swagger
 * /:
 *  get:
 *      summary: Main routes
 *      description: get all need data for index page
 *      tags:
 *          - Indexpage
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */