const { isValidObjectId } = require('mongoose');
const AppError = require('../../utils/AppError');

// Checks if the user entered object id in parameters is valid
module.exports = (req, res, next, objectId) => {
    if (!isValidObjectId(objectId)) {
        return next(
            new AppError('Invalid Object ID Please enter a valid id', 400)
        );
    }

    next();
};
