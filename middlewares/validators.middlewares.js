const {body, validationResult} = require('express-validator');

//Utils

const {AppError} = require('../utils/appError');

const checkResult = (req,res,next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        const errorMsgs = errors.array().map(err => err.msg) // Esta funcion regresa un arreglo de errores
        const message = errorMsgs.join('. ');
        return next( new AppError(message, 500));
    }
    next(); // Para que pase al siguiente middleware  
}



const createUserValidator = [
    // username, email, password required
    body('username').notEmpty().withMessage('username can not be empty'),

    body('email').isEmail().notEmpty().withMessage('Must provide a valid email'),

    body('password').notEmpty().isAlphanumeric().withMessage('password must contain letters and numbers')
                    .isLength({min:8}).withMessage('password must be at least 8 characters long'),
    checkResult,
]

  
module.exports = { createUserValidator }