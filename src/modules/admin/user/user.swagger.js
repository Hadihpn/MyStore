
/**
 * @swagger
 *  components:
 *      schemas:
 *          updateProfile:
 *              type: object
 *              properties:
 *                  userName:
 *                      type: string
 *                      description: the userName of User
 *                  firstName:
 *                      type: string
 *                      description: firstName title of User
 *                  lastName:
 *                      type: string
 *                      description: the lastName of User
 *                  email:
 *                      type: string
 *                      description: the email of User
 *                  address:
 *                      type: string
 *                      description: the address of User
 *                  birthday:
 *                      type: string
 *                      description: the birthday of User
 */


/**
 * @swagger
 *  /admin/userManagment/:
 *      get:
 *          tags: [ UserManagment(AdminPanel)]
 *          summary: get all Users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success - get array of products
 */
/**
 * @swagger
 *  /admin/userManagment/update/{id}:
 *      patch:
 *          tags: [ UserManagment(AdminPanel)]
 *          summary: update  userProfile  by id 
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
 *                          $ref: '#/components/schemas/updateProfile'
 *          responses:
 *              200:
 *                  description: success
 */
