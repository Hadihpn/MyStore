/**
 * @swagger
 *  components:
 *      schemas:
 *          addProduct:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   images
 *                  -   price
 *                  -   supplier
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  price:
 *                      type: string
 *                      description: the price
 *                  type:
 *                      type: string
 *                      description: the type
 *                  category:
 *                      type: string
 *                      description: the id of category 
 *                  supplier:
 *                      type: string
 *                      description: the id of supplier 
 *                  images:
 *                      type: file
 *                      description: the index picture of product
  *          productUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: array
 *                      items: 
 *                          type: string
 *                      description: the id of category for foreinField in product
 *                  image:
 *                      type: file
 *                      description: the index picture of product
 */


/**
 * @swagger
 *  /admin/product:
 *      get:
 *          tags: [ product(AdminPanel)]
 *          summary: get all products
 *          parameters:
 *              -   in: query 
 *                  name: search 
 *                  type: string 
 *                  description: text for search in title 
 *          responses:
 *              200:
 *                  description: success - get array of products
 */

/**
 * @swagger
 *  /admin/product/{id}:
 *      get:
 *          summary: get product by ID and populate this field 
 *          tags: [ product(AdminPanel) ]
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
 *  /admin/product/addproduct:
 *      post:
 *          tags: [ product(AdminPanel)]
 *          summary: create product document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/addProduct'
 *          responses:
 *              201:
 *                  description: created
 */
/**
 * @swagger
 *  /admin/product/edit/{id}:
 *      patch:
 *          tags: [ product(AdminPanel)]
 *          summary: update  product document by id 
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
 *                          $ref: '#/components/schemas/productUpdate'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/product/delete/{id}:
 *      delete:
 *          summary: remove product by ID 
 *          tags: [ product(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */