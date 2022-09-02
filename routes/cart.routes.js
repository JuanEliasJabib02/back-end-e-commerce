const express = require('express');



//controller

const { addProduct, updateCart, removeProductFromCart, purchase, getCart } = require('../controllers/cart.controller');
const { authJWT } = require('../middlewares/auth.middleware');


//midllewares


const cartRouter = express.Router();

//endpoints

cartRouter.post('/add-product', 
    authJWT,
    addProduct
)

cartRouter.patch('/update-cart', 
    authJWT,
    updateCart
)

cartRouter.delete('/:productId', 
    authJWT,
    removeProductFromCart
)

cartRouter.post('/purchase', 
    authJWT,
    purchase
)

cartRouter.get('/cart-user',
    authJWT,
    getCart
)

module.exports =  { cartRouter }



// Documentation


/**
 * @swagger
 * /api/v1/cart/add-product:
 *  post:
 *    summary: add product to cart
 *    tags: [cart]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/addproduct"
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                  status: "succes"
 *    security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/cart/purchase:
 *  post:
 *    summary: purchase!!
 *    tags: [cart]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                  status: "succes"
 *    security:
 *     - bearerAuth: []
 */


/**
 * @swagger
 * /api/v1/cart/update-cart:
 *  patch:
 *    summary: update products
 *    tags: [cart]
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/updateProductCart"
 *    responses:
 *      204:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */


/**
 * @swagger
 * /api/v1/cart/{id}:
 *  delete:
 *    summary: delete product
 *    tags: [cart]
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer 
 *    responses:
 *      204:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *    security:
 *     - bearerAuth: []
 */


/**
 * @swagger
 * /api/v1/cart/cart-user:
 *  get:
 *    summary: get actual user cart
 *    tags: [cart]
 *    responses:
 *      204:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */





//Schemas


/**
 * @swagger
 * components:
 *  schemas:
 *    addproduct:
 *      type: object
 *      properties:
 *        productId:
 *          type: string
 *        quantity:
 *          type: string
 *          required:
 *            productId
 *            quantity
 *      example:
 *        productId: 1
 *        quantity: 1
 * 
 *    updateProductCart:
 *      type: object
 *      properties:
 *        productId:
 *          type: integer
 *        newQuantity:
 *          type: integer
 *      example:
 *        productId: 1
 *        newQuantity: 3
 */

