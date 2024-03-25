/**
 * @swagger
 *  tags:
 *      name: Developer-Routes
 *      description: Developer utils
 * 
 */
/**
 * @swagger
 *  /admin/developer/password-hash/{password}:
 *      get:
 *          tags:
 *              - [Developer-Routes] 
 *          summary: hashed password creator with bcrypt
 *          parameters:
 *              -   in : path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses:
 *              200:
 *                 description: success
 */

/**
 * @swagger
 *  /admin/developer/random-number/{digitNumber}:
 *      get:
 *          tags:
 *              - [Developer-Routes] 
 *          summary: generate random number just add how much digit u need
 *          parameters:
 *              -   in : path
 *                  type: number
 *                  name: digitNumber
 *                  required: true
 *          responses:
 *              200:
 *                 description: success
 */