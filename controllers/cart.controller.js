const { catchAsync } = require("../utils/catchAsync");

const { Cart } = require('../models/carts.model');

//Models
const { Product } = require("../models/products.model");
const { ProductInCart } = require("../models/productsInCart.model");

//Utils
const { AppError } = require("../utils/appError");
const { Email } = require("../utils/email.util");


const addProduct = catchAsync(
   
    
    //check if product already exist in cart
    async (req,res,next) => {
        
         // 1. ver si el producto esta disponible y la cantidad
        const {productId, quantity } = req.body;

        

        const product = await Product.findOne({
            where:{
                id: productId,
                status:"avalaible"
            }
        })

        if(!product  ) {
            return next(new AppError('Invalid product',404))
        } else if(quantity > product.quantity){
            return next(new AppError(`only are ${product.quantity} available`),400)
        };

        //checkear si el usuario tiene un carrito activo 
        const {userActive } = req;

        const cart = await Cart.findOne({
            where: {
                status:"active",
                userId: userActive.id
            },
        })

        if(!cart){
            //Crear nuevo carro si no tiene activo
            const newCart = await Cart.create({
                userId: userActive.id
            })
            //Añadir producto al carrito
             await ProductInCart.create({
                cartId: newCart.id,
                productId,
                quantity
            });
        } else {
            // Ver si el producto ya esta en el carrito

            const productExist = await ProductInCart.findOne({
                where: {
                    cartId: cart.id,
                    productId
                }
            });

            if (productExist) {
                return next( new AppError('product is already in the cart',400))
            }

            ProductInCart.create({
                cartId: cart.id,
                productId,
                quantity,
            })
        }

        res.status(200).json({
            status:"succes",
            cart
        })
    }
)



const updateCart = catchAsync(

    async (req,res,next) => {
        
         // 1. ver si el producto esta disponible y la cantidad
         const {productId , newQuantity } = req.body;
         const {userActive } =req;

         const product = await Product.findOne({
             where:{
                 id: productId,
                 status:"avalaible"
             }
         })
 
         if(!product  ) {
             return next(new AppError('Invalid product',404))
         } else if( newQuantity > product.quantity){
             return next(new AppError(`only are ${product.quantity} available`),400)
         };

         const cart = await Cart.findOne({
            where:{
                userId: userActive.id,
                status:"active"
            }
         })
 
         if(!cart){
            return next( new AppError('cart not found',404));
         }

         const productInCart = await ProductInCart.findOne({
            where:{
                cartId: cart.id,
                productId,
                status:"avalaible"

            }
         })

         if (!productInCart) {
            return next( new AppError('product not found in cart'),404)
            
         }

         if (newQuantity <= 0) {
            await productInCart.update({
                status:"removes",
                quantity:0
            })
         }

         res.status(200).json({
            status:"succes"
         })

    }
)


const removeProductFromCart = catchAsync(

    async (req,res,next) => {
        const { productId } = req.params;
        const { userActive} = req;

        const cart = Cart.findOne({
            where:{
                userId: userActive.id
            }
        })

        if (!cart) {
            return next ( new AppError('cart not found',400));
        }

        const productInCart = ProductInCart.findOne( 
        {       cartId: cart.id, 
                productId, 
                status:"avalaible"
        }) 

        ProductInCart.update({
            status:"removed",
            quantity:0
        })

        if (!productInCart) {
            return next(new AppError('product not found', 400));
        }

        res.status(200).json({
            status:"sucess"
        })


    }
)

const purchase = catchAsync(

    async (req,res,next) => {
       
        const { userActive } = req;

        const cart = await Cart.findOne({
            where:{
                userId: userActive.id,
                status:"active"
            },
            include:[
                {
                 model: ProductInCart,
                 required:false,
                 where:{
                    status:"active"
                 },
                 include:[
                    {model: Product}
                 ]

                },
            ]
        })

        if (!cart) {
            return next( new AppError('Cart not found'),400);
        }

        let totalPrice = 0;

        const productsPurchasedPromises = cart.productInCars.map(async productInCart => {


            const newQuantity = productInCart.product.quantity - productInCart.quantity;

            const productPrice = productInCart.product.quantity * +productInCart.price;

            totalPrice = totalPrice + productPrice;

             await productInCart.product.update({
                quantity: newQuantity,
            });

            return await productInCart.update({
                status:"purchased"
            })


        });

        await Promise.all(productsPurchasedPromises);

        await cart.update({
            status:"purchased",
        })

        //send Email
        await new Email(userActive.email).sendPurchased(productsPurchasedPromises)

        res.status(200).json({
            status:"succes",
            productsPurchasedPromises
        })

    }
)

const getCart = catchAsync(

    async (req,res,next) => {


        
        const { userActive } = req;

        const cart = await Cart.findOne({
            where:{
                userId: userActive.id,
                status:"active"
            },
            include:[
                {
                 model: ProductInCart,
                 required:false,
                 where:{
                    status:"active"
                 },
                 include:[
                    {model:Product}
                 ]

                },
            ]
        })

        if (!cart) {
            return next( new AppError('Cart not found'),400);
        }

        res.status(200).json({
            status:"succes",
            cart
        })
    }
)

module.exports = { addProduct, removeProductFromCart, updateCart, purchase, getCart}