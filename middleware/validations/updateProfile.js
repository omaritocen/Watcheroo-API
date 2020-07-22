const { body } = require('express-validator');

// Validates the body of request
module.exports = () => {
    return [
        body('firstName').optional().notEmpty(),
        body('lastName').optional().notEmpty(),
        body('username').optional().matches(/^[a-zA-Z0-9_-]*$/)
    ];
};
