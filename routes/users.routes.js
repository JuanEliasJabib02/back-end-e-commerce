const express = require('express');

// Controllers
const { signup , getUsers, login, updateUser, deleteUser} = require('../controllers/user.controller');
const { authJWT, userAccount } = require('../middlewares/auth.middleware');
const { userExist } = require('../middlewares/users.middleware');


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
    userExist,
    authJWT,
    userAccount,
    updateUser
);

usersRouter.delete('/:id',
    userExist,
    authJWT,
    userAccount,
    deleteUser
);










usersRouter.get('/', 
    getUsers
);



module.exports = { usersRouter }