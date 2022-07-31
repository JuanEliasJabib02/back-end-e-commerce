
//Libraries 
const bcrypt = require('bcryptjs'); // Sirve para encriptar la contraseña
const jwt = require('jsonwebtoken') // -> Esta libreria nos permite dar el token que sera con el que realizaremos la autentificazion



//Models

const { User } = require('../models/users.model');



//Utils

const { catchAsync } = require("../utils/catchAsync");
const { Email } = require('../utils/email.util');
const { AppError } = require('../utils/appError');



const signup = catchAsync(
    // user validator -> DONE
    // Hash password and remove from response -> DONE
    // create new User -> DONE
    // Send welcome email -> DONE

    async (req,res,next) => {
        
        const {username, email, password, } = req.body;

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
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

    }
);

const updateUser = catchAsync(
    //Only username and Email
    async (req,res,next) => {

    }
);

const deleteUser = catchAsync(
    //Soft Delete
    async (req,res,next) => {

    }
);

const myOrders = catchAsync(
    // orders done by the user
    async (req,res,next) => {

    }
);

const orderById = catchAsync(
    
    async (req,res,next) => {

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