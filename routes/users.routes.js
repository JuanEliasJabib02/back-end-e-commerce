const express = require('express');

// Controllers
const { signup , getUsers, login, updateUser, deleteUser, getUserProducts, myOrders, orderById} = require('../controllers/user.controller');
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

usersRouter.get('/me',
    authJWT,
    getUserProducts
)

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

usersRouter.get('/orders',
    authJWT,
    myOrders
)

usersRouter.get('/orders/:id',
    orderById,
    getUserProducts
)


usersRouter.get('/', 
    getUsers
);


module.exports = { usersRouter }


// Documentation

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    summary: New user
 *    tags: [users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/signup"
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                  status: "active"
 *                  id: 1
 *                  username: juan02
 *                  email: juaneliasjabib02@gmail.com
 *                  role: client
 *                  updatedAt: 2022-08-29T19:20:58.949Z
 *                  createdAt: 2022-08-29T19:20:58.949Z                     
 *      400:
 *        description: Conflict
 *      500:
 *        description: Bad request
 */


/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: Login
 *    tags: [users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/login"
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                  status: "active"
 *                  id: 1
 *                  username: juan02
 *                  email: juaneliasjabib02@gmail.com
 *                  role: client
 *                  updatedAt: 2022-08-29T19:20:58.949Z
 *                  createdAt: 2022-08-29T19:20:58.949Z
 *                       
 *      400:
 *        description: Conflict
 *      500:
 *        description: Bad request
 */



/**
 * @swagger
 * /api/v1/users/{id}:
 *  patch:
 *    summary: update user
 *    tags: [users]
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/updateUser"
 *    responses:
 *      204:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *    security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *    summary: delete user
 *    tags: [users]
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *    responses:
 *      204:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *    security:
 *     - bearerAuth: []
 */


/**
 * @swagger
 * /api/v1/users/me:
 *  get:
 *    summary: get user products
 *    tags: [users]
 *    responses:
 *      204:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *    security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/users/orders:
 *  get:
 *    summary: get user orders
 *    tags: [users]
 *    responses:
 *      204:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *    security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/users/orders/{id}:
 *  get:
 *    summary: get user order by id
 *    tags: [users]
 *    responses:
 *      204:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *    security:
 *     - bearerAuth: []
  *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 */











//Schemas


/**
 * @swagger
 * components:
 *  schemas:
 *    signup:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        role:
 *          type: string
 *          required:
 *            username
 *            password
 *            email
 *            role
 *      example:
 *        username: juan02
 *        email: juaneliasjabib02@gmail.com
 *        password: easypass1234
 *        role: admin
 *    login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *          required:
 *            email
 *            password
 *      example:
 *        email: juaneliasjabib02@gmail.com
 *        password: easypass1234
 *    updateUser:
 *      type: object
 *      properties:
 *          username:
 *            type: string
 *          email:
 *            type: string
 *      example:
 *        name: nameedited
 *        email: emailnew@gmail.com
 */


