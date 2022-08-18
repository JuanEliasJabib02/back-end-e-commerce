const express = require('express');




//CONTROLLER

const { newCategory, updateCategory, getCategories, } = require('../controllers/categories.controller');
const {newProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products.controller');


//Middlewares


const { authJWT, isAdmin } = require('../middlewares/auth.middleware');
const { productExists, productOwner } = require('../middlewares/products.middleware');
const { newProductValidator } = require('../middlewares/validators.middlewares');


//Utils

const { upload } = require('../utils/upload.util');




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
    upload.single("productImg"),
    newProduct
);

productsRouter.get('/',
    getProducts
);

productsRouter.get('/:id',
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

