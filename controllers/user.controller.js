
//Libraries 
const bcrypt = require('bcryptjs'); // Sirve para encriptar la contraseña
const jwt = require('jsonwebtoken') // -> Esta libreria nos permite dar el token que sera con el que realizaremos la autentificazion



//Models

const { User } = require('../models/users.model');
const { Order } = require('../models/orders.model');



//Utils

const { catchAsync } = require("../utils/catchAsync");
const { Email } = require('../utils/email.util');
const { AppError } = require('../utils/appError');
const { Cart } = require('../models/carts.model');
const { Product } = require('../models/products.model');
const { ProductInCart } = require('../models/productsInCart.model');


const signup = catchAsync(

    async (req,res,next) => {
        
        const {username, email, password, role} = req.body;

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
            role,
            
        })

        newUser.password = undefined; // Es de buena practica no enviar la contraseña en la respuesta aunque este escriptada

    
        await new Email(email).sendWelcome(username);//Para pasarle dinamicamente el nombre a sendWelcome 

        res.status(200).json({
            status:"succes",
            newUser

        })
    }
);

const login = catchAsync(
    
    async (req,res,next) => {
        // 1. get email and password from client
        const {email, password} = req.body;

        //2. validate email and password

        const user = await User.findOne({
            where:{
                email,
                status:"active"
            }
        })

        if (!user) {
            return next(new AppError('email & password fail'),400);
        }

        const passOkay = await bcrypt.compare(password, user.password)

        if(!passOkay) {
            return next( new AppError(' email & password fail', 400))
         }

         const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SIGN,
            {
                expiresIn:"1d"
            }
         )

         res.status(200).json({
            status:"succes",
            token
         })
    }
);

const getUserProducts = catchAsync(
    
    async (req,res,next) => {

        const { userActive } = req;

        const products = await Product.findAll({
            where:{
                userId: userActive.id,
                status: "avalaible"
            }
        })

      res.status(200).json({
          status:"succes",
          products
      })
    }
);

const updateUser = catchAsync(
    //Only username and Email
    async (req,res,next) => {

       const { userActive } = req;

       const { username, email } =req.body;

       await userActive.update({
            username,
            email,
       })
        
       res.status(200).json({
            status:"succes"
       })
        
    }
);

const deleteUser = catchAsync(
    //Soft Delete
    async (req,res,next) => {
        console.log("deleted")

        
         /* Tecnica soft delete */
       const { userActive } = req; // Viene desde el middleware
        
       await userActive.update ({status:'disabled'});
   
       res.status(204).json({status:'sucess'});


    }
);

const myOrders = catchAsync(
    async (req,res,next) => {

        const {userActive} =req;

        const orders = await Order.findAll({
            where:{
                userId: userActive.id,
            },
            
            include:[{   
                model: Cart, where:{status:"purchased", userId: userActive.id},
                attributes:["id"],
                include:[{
                    model: ProductInCart, where:{status:"purchased"},attributes:["quantity"],
                    include:[{
                        model:Product, attributes:["title","price"]
                    }]
                    

                }]
            }],
               
        })

       

        res.status(200).json({
            status:"succes",
            orders
        })


       

    }
);

const orderById = catchAsync(
    
    async (req,res,next) => {
        //Inlcude carts
        //Include purchased products

        const { id } =req.params;

        const order = await Order.findOne({
            where:{
                id,
            },
            include:[{
                model:Cart, attributes:["id"],
                include:[{
                    model:ProductInCart, where:{status:"purchased"},attributes:["quantity"],
                    include:[{
                        model:Product , attributes:["title","price"]
                    }]
                }]
            }]

            // WORKING THIS
        })

        res.status(200).json({
            status:"succes",
            order
        })
        
    }
);

const getUsers = catchAsync(
    
    async (req,res,next) => {
        
        const users = await User.findAll();

        res.status(200).json({
            status:"succes",
            users
        })
    }
);

module.exports = {
    signup,
    login,
    getUserProducts,
    updateUser,
    deleteUser,
    myOrders,
    orderById,
    getUsers
}