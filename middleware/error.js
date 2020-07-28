const AppError = require('../utils/AppError');
const logger = require('../logger/logger');

module.exports = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;


    // Error in JSON body
    if (err instanceof SyntaxError) {
        error = new AppError(err.message, 400);
    }

    // Mongoose duplicate keys
    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new AppError(message, 400);
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(e => e.message);
        error = new AppError(message, 400);
    }

    // Mongoose Bad ObjectID
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new AppError(message, 404);
    }

    const statusCode = error.statusCode ? error.statusCode : 500;
    let errorResponse = error.errorsObject
        ? error.errorsObject
        : error.message;

    if (statusCode == 500) {
        logger.error(err.message);
        errorResponse = 'Internal Server Error';
    }

    res.status(statusCode).json({
        success: false,
        error: errorResponse,
    });
};
