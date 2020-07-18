
// A Custom error message that includes message and status code
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.errorsObject = message instanceof Array ? message : null;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;