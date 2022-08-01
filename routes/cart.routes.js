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