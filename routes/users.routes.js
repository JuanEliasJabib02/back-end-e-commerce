const express = require('express');

// Controllers
const { signup , getUsers, login} = require('../controllers/user.controller');


//Middlewares

const { createUserValidator } = require('../middlewares/validators.middlewares');

//Router

const usersRouter = express.Router();

//Endpoints

usersRouter.post('/', 
    createUserValidator,
    signup
);

usersRouter.post('/login', 
    login
);








usersRouter.get('/', 
    getUsers
);



module.exports = { usersRouter }