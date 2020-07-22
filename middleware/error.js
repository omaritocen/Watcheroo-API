const AppError = require('../utils/AppError');
const logger = require('../logger/logger');

module.exports = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Mongoose duplicate keys
    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new AppError(message, 400);
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
