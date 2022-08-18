const express = require('express');
const helmet = require('helmet'); /*  Agrega mas seguridad  */
const compression = require('compression'); /* Nos ayuda a comprimir las responses para un mejor performance */
const morgan = require('morgan'); /* Nos ayuda a saber que peticiones estan llegando al servidor */
const path = require('path');

// Init express
const app = express ();
app.use(express.json());

// Set template engine 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//Serving static files
app.use(express.static(path.join(__dirname, 'public'))); // Para que express sirva archivos estaticos para que express siemrpe sepa donde esta public

//Controllers

const { globalErrorHandler } = require('./controllers/error.controller');
//Utils
const { AppError } = require('./utils/appError');
// Routers
const { usersRouter } = require('./routes/users.routes');

const { viewsRouter } = require('./routes/views.routes');
const { productsRouter } = require('./routes/products.routes');
const { cartRouter} = require('./routes/cart.routes.js')


// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('dev'));



//Endpoints
app.use('/', viewsRouter)
app.use('/api/v1/users', usersRouter );

app.use('/api/v1/products', productsRouter);

app.use('/api/v1/cart', cartRouter );

app.all('*',(req,res,next) => {
    next( new AppError (`${req.method} ${req.url} not found in this server`),404 )
})


app.use(globalErrorHandler); // -> Al global error Handler llegan todos los errores

module.exports = { app  } 