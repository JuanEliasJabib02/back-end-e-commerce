const express = require('express');




//CONTROLLER

const { newCategory, updateCategory, getCategories, } = require('../controllers/categories.controller');
const {newProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products.controller');


//Middlewares


const { authJWT, isAdmin } = require('../middlewares/auth.middleware');
const { productExists, productOwner } = require('../middlewares/products.middleware');
const { newProductValidator } = require('../middlewares/validators.middlewares');


//Utils

const { upload } = require('../utils/upload.util')




//Router

const productsRouter = express.Router();


//Endpoints

productsRouter.get('/categories',
    getCategories
);


productsRouter.post('/categories',
    authJWT,
    newCategory
);

productsRouter.patch('/categories/:id',
    authJWT,
    updateCategory
)


productsRouter.post('/',
    authJWT,
    newProductValidator,
    upload.array("productImg", 5),
    newProduct
);

productsRouter.get('/',
    getProducts
);

productsRouter.get('/:id',
    productExists,
    getProductById
);


productsRouter.patch('/:id',
    authJWT,
    productExists,
    productOwner,
    updateProduct
);

productsRouter.delete('/:id',
    authJWT,
    productExists,
    productOwner,
    deleteProduct
);


module.exports = { productsRouter }


// Documentation

//products


/**
 * @swagger
 * /api/v1/products:
 *  post:
 *    summary: new  products
 *    tags: [products]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/products"
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                  status: "active"
 *                  id: 1
 *                  name: Telephones
 *                  updatedAt: 2022-08-29T19:20:58.949Z
 *                  createdAt: 2022-08-29T19:20:58.949Z                     
 *      400:
 *        description: Conflict
 *      500:
 *        description: Bad request
 *    security:
 *     - bearerAuth: []
 */







//Categorys
/**
 * @swagger
 * /api/v1/products/categories:
 *  post:
 *    summary: New Category
 *    tags: [categories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/category"
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                  status: "active"
 *                  id: 1
 *                  name: Telephones
 *                  updatedAt: 2022-08-29T19:20:58.949Z
 *                  createdAt: 2022-08-29T19:20:58.949Z                     
 *      400:
 *        description: Conflict
 *      500:
 *        description: Bad request
 *    security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/products/categories/{id}:
 *  patch:
 *    summary: update user
 *    tags: [categories]
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/updateCategory"
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
 * /api/v1/products/categories:
 *  get:
 *    summary: get open restaurants
 *    tags: [categories]
 *    responses:
 *      204:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */






// Schemas

/**
 * @swagger
 * components:
 *  schemas:
 *    category:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          required:
 *            name:
 *      example:
 *        name: Telephones
 * 
 *    updateCategory:
 *      type: object
 *      properties:
 *        newName:
 *          type: string
 *          required:
 *            newName:
 *      example:
 *        newName: Computers
 * 
 *    products:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: decimal
 *        quantity:
 *          type: integer
 *        categoryId:
 *          type: integer
 *        productImg:
 *          type: file
 *          required:
 *            title:
 *            description:
 *            price:
 *            quantity:
 *            categoryId:
 *      example:
 *        title: Macbook pro 2022
 *        description: "Good pc"
 *        price: 600.60
 *        quantity: 20
 *        categoryId: 1
 */