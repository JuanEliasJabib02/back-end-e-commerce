const express = require('express');




//CONTROLLER

const { newCategory, updateCategory, getCategories, } = require('../controllers/categories.controller');
const {newProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products.controller');


//Middlewares


const { authJWT, isAdmin } = require('../middlewares/auth.middleware');
const { productExists, productOwner } = require('../middlewares/products.middleware');
const { newProductValidator } = require('../middlewares/validators.middlewares');






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
    newProductValidator,
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

