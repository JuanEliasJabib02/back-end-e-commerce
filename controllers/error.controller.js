const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})


//utils

const {AppError} = require('../utils/appError.js');

// Podemos manejar los errores en desarrollo.
const sendErrorDev = (err,req,res) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        status:'fail',
        message:err.message,
        error:err,
        stack: err.stack,
    });
};


// Con esto manejamos los errores en produccion para decirle al cliente de una manera que entienda que fue lo q salio mal
const sendErrorProd = (err, req, res) => {
    const statusCode = err.statusCode || 500 

    
    res.status(statusCode).json({
        status:'fail',
        message:err.message || "Something went very wrong!",
    });
};

//Template 
const nameError = () => {
    return new AppError('Error description',400);
}



const globalErrorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log("is development")
        sendErrorDev(err,req,res);
    } else if (process.env.NODE_ENV === 'production') {
        
        let error = {...err};
        error.message = err.message;
            if (err.name === "nameerror") {
                error = nameError();
            } else if(err.name === 'nameerror'){
                error = nameError();
            }
    //Aqui podemos poner los errores que sabemos que se peude ocasionar para darle una respuesta al cliente mas legible 
    sendErrorProd(err,req,res);
}}


module.exports = {globalErrorHandler}