const validate = require('./validations/validate');
const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

// Chains middleware of checking for errors and displaying error for users
module.exports = (field) => {
    const middleware = [validate(field), checkValidBody];
    return middleware;
} 

// Checks if user body contains error from validations and returns error if so
const checkValidBody = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new AppError(errors.array(), 422));
    }

    next();
};
