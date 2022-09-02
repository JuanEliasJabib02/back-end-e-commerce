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

/**
 * @swagger
 * /api/v1/products/categories:
 *  post:
 *    summary: New Category
 *    tags: [categorys]
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
 */