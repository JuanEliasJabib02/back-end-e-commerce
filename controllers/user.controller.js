
//Libraries 
const bcrypt = require('bcryptjs'); // Sirve para encriptar la contraseña


//Models

const { User } = require('../models/users.model');



//Utils

const { catchAsync } = require("../utils/catchAsync");



const signup = catchAsync(
    // user validator -> DONE
    // Hash password and remove from response -> DONE
    // create new User
    // Send welcome email

    async (req,res,next) => {
        
        const {username, email, password,} = req.body;

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        })

        newUser.password = undefined; // Es de buena practica no enviar la contraseña en la respuesta aunque este escriptada

        res.status(200).json({
            status:"succes",
            newUser

        })




    }
);

const login = catchAsync(
    
    async (req,res,next) => {

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


module.exports = {
    signup,
    login,
    getUserProducts,
    updateUser,
    deleteUser,
    myOrders,
    orderById
}