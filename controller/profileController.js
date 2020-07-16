const _ = require('lodash');

const Profile = require('../models/profile');

//  @desc   Returns the Logged in user profile
//  @route  GET /api/v1/profiles/
//  @access Private
module.exports.getMe = async (req, res, next) => {
    const profile = await Profile.findOne({ _userId: userId });

    res.status(200).json({
        success: true,
        data: profile,
    });
};

//  @desc   Updates the Logged in user profile
//  @route  UPDATE /api/v1/profiles/
//  @access Private
module.exports.updateProfile = async (req, res, next) => {
    const body = _.pick(req.body, ['firstName', 'lastName']);

    const profile = await Profile.findOneAndUpdate(
        { _userId: req.user._id },
        body,
        {
            new: true,
        }
    );

    res.status(200).json({
        success: true,
        data: profile,
    });
};
