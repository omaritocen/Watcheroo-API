const _ = require('lodash');
const User = require('../models/user');
const AppError = require('../utils/AppError');
const Profile = require('../models/profile');

const mongoose = require('mongoose');
const fawn = require('fawn');
const Fawn = require('fawn/lib/fawn');

//  @desc   Registers a new user into the server
//  @route  POST /api/v1/auth/signup
//  @access Public
//  @param  Email Password FirstName LastName
module.exports.signUp = async (req, res, next) => {
    const body = _.pick(req.body, [
        'email',
        'password',
        'firstName',
        'lastName',
    ]);

    let user = new User({
        email: body.email,
        password: body.password,
    });

    fawn.init(mongoose);
    // new Fawn.Task()
    //     .save('users', user)
    //     .save('profiles', {
    //         firstName: body.firstName,
    //         lastName: body.lastName,
    //         _userId: { $ojFuture: '0._id' },
    //     })
    //     .run({ useMongoose: true })
    //     .then((results) => {
    //         user = new User(results[0]);
    //         sendTokenResponse(user, res);
    //     })
    //     .catch((err) => next(err));

    const results = await new Fawn.Task()
        .save('users', user)
        .save('profiles', {
            firstName: body.firstName,
            lastName: body.lastName,
            _userId: { $ojFuture: '0._id' },
        })
        .run({ useMongoose: true });
    user = new User(results[0]);
    sendTokenResponse(user, res);
};

//  @desc   Logins a new user into the server and returns him an access token
//  @route  POST /api/v1/auth/login
//  @access Public
//  @param  Email Password
module.exports.login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select(
        '+password'
    );
    if (!user) {
        return next(new AppError('Invalid Credntials', 400));
    }

    const isValidPass = await user.verifyPassword(req.body.password);
    if (!isValidPass) {
        return next(new AppError('Invalid Credntials', 400));
    }

    sendTokenResponse(user, res);
};

//  @desc   gets the data of the current logged in user
//  @route  GET /api/v1/auth/me
//  @access Private
module.exports.getMe = async (req, res, next) => {
    res.status(200).json({ success: true, data: req.user });
};

const sendTokenResponse = async (user, res) => {
    const token = await user.generateAuthToken();

    res.status(200).json({
        success: true,
        data: {
            token: token,
            expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
            _userId: user._id,
        },
    });
};
