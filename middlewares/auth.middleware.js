const jwt = require('jsonwebtoken') // -> Esta libreria nos permite dar el token que sera con el que realizaremos la autentificazion
const dotenv= require('dotenv') // Para importar la libreria dotenv y poder usar las variables de entorno

dotenv.config({path:'./config.env'}) // --> Para que encuentr la clave  en config.env

//Models

const { User } = require('../models/users.model');

//utils
const { catchAsync } = require("../utils/catchAsync");

const {AppError} = require('../utils/appError');


const authJWT = catchAsync(

    //1. Import jwt librarie
    async (req,res,next) => {
        //2. extract the token
        let token = undefined;
        //3. validate token
        if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
         }
     
         if(!token){
             return next( new AppError('Invalid Token'), 403);
         }

         //4. validate if the token expired
         const decoded = await jwt.verify(
            token,
            process.env.JWT_SIGN
        )

        //5. Find the is the user is active
        const userActive = await User.findOne( { where: { id : decoded.id}, status:"active"})

        if(!userActive) {
            return next(new AppError("The owner of this token dont exist anymore", 403))
        }
        req.userActive = userActive; /* Para extraer el id del usuario */

        
        next();
       }
)

// para saber si es el dueño de la cuenta 
const userAccount = catchAsync(

    async (req,res,next) => {
        const {userActive, user} = req;

        if(userActive.id !== user.id){
            return next( new AppError ('This account dont belong to you',403))
         }
        next();
    }
)



module.exports = { authJWT, userAccount }