const express = require('express');

// Controllers
const { signup } = require('../controllers/user.controller');


//Middlewares

const { createUserValidator } = require('../middlewares/validators.middlewares');

//Router

const usersRouter = express.Router();

//Endpoints

usersRouter.get('/', 
    createUserValidator,
    signup
);



module.exports = { usersRouter }