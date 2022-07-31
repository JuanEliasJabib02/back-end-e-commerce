const express = require('express');




//CONTROLLER

const { newCategory, updateCategory, getCategories, } = require('../controllers/categories.controller');
const {newProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products.controller');


//Middlewares


const { authJWT, isAdmin } = require('../middlewares/auth.middleware');
const { productExists } = require('../middlewares/products.middleware');






//Router

const productsRouter = express.Router();


//Endpoints

productsRouter.get('/categories',
    getCategories
);


productsRouter.post('/categories',
    authJWT,
    isAdmin,
    newCategory
);

productsRouter.patch('/categories/:id',
    authJWT,
    isAdmin,
    updateCategory
)


productsRouter.post('/',
    authJWT,
    isAdmin,
    newProduct
);

productsRouter.get('/',
    getProducts
);

productsRouter.get('/:id',
    getProductById
);


productsRouter.patch('/:id',
    productExists,
    updateProduct
);

productsRouter.delete('/:id',
    productExists,
    deleteProduct
);







module.exports = { productsRouter }

