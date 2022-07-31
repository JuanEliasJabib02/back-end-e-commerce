const express = require('express');




//Controller

const { newCategory, updateCategory, getCategories } = require('../controllers/products.controller');
const { authJWT, isAdmin } = require('../middlewares/auth.middleware');



//Middlewares


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




module.exports = { productsRouter }

