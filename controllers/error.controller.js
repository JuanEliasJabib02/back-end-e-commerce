
const dotenv = require('dotenv');

// Utils
const { AppError } = require('../utils/appError');

dotenv.config({ path: './config.env' });

const sendErrorDev = (err, req, res) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		status: 'fail',
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

const sendErrorProd = (err, req, res) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		status: 'fail',
		message: err.message || 'Something went very wrong!',
	});
};

const emailError = () => {
	return new AppError('The email you entered is already taken', 400);
};

const JWTExpiredError = () => {
	return new AppError('Your session has expired! Please login again.', 401);
};

const JWTError = () => {
	return new AppError('Invalid session. Please login again.', 401);
};

const globalErrorHandler = (err, req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, req, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		error.message = err.message;

		if (err.name === 'SequelizeUniqueConstraintError') {
			error = emailError();
		} else if (err.name === 'TokenExpiredError') {
			error = JWTExpiredError();
		} else if (err.name === 'JsonWebTokenError') {
			error = JWTError();
		}

		sendErrorProd(error, req, res);
	}
};

module.exports = { globalErrorHandler };