const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/user');

// Authorize user with access tokens
module.exports = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return next(new AppError('Not Authorized to access this route', 401));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (err) {
        return next(new AppError('Not Authorized to access this route', 401));
    }

}