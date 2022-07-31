const express = require('express');

// Controllers
const { signup , getUsers, login, updateUser} = require('../controllers/user.controller');
const { authJWT } = require('../middlewares/auth.middleware');


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


usersRouter.patch('/:id',
    authJWT,
    updateUser
);









usersRouter.get('/', 
    getUsers
);



module.exports = { usersRouter }