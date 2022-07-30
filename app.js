const express = require('express');
const helmet = require('helmet'); /*  Agrega mas seguridad  */
const compression = require('compression'); /* Nos ayuda a comprimir las responses para un mejor performance */
const morgan = require('morgan'); /* Nos ayuda a saber que peticiones estan llegando al servidor */

// Init express
const app = express ();
app.use(express.json());

//Controllers

const { globalErrorHandler } = require('./controllers/error.controller');
//Utils
const { AppError } = require('./utils/appError');
// Routers
const { usersRouter } = require('./routes/users.routes');


// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));



//Endpoints
app.use('/api/v1/users', usersRouter );

app.all('*',(req,res,next) => {
    next( new AppError (`${req.method} ${req.url} not found in this server`),404 )
})


app.use(globalErrorHandler); // -> Al global error Handler llegan todos los errores

module.exports = { app  } 