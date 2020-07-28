const { body } = require('express-validator');

// Validates the body of request
module.exports = () => {
    return [
        body('movieName').exists().notEmpty(),
        body('_guest').exists().isMongoId(),
    ];
};
