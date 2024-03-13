/** 
 * @swagger:
 *  name: User
 *  description: User routes
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
 *              firstName:
 *                  type: string  
 *              lastName:
 *                  type: string  
 *              userName:
 *                  type: string  
 *              phone:
 *                  type: string  
 *              email:
 *                  type: string  
 *              
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: Main routes
 *      description: get all need data for index page
 *      tags:
 *          - Users
 *      responses:
 *          200: 
 *              description: successfully
 *          404: 
 *              description: Not Found
 *              
 */