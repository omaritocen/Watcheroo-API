const AppError = require("../utils/AppError")

// Displays readable error message when user enters a route that doesn't exist
module.exports = (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}