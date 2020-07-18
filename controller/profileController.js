const _ = require('lodash');

const Profile = require('../models/profile');
const AppError = require('../utils/AppError');

//  @desc   Returns the Logged in user profile
//  @route  GET /api/v1/profiles/
//  @access Private
module.exports.getMe = async (req, res, next) => {
    const profile = await Profile.findOne({ _userId: req.user._id });

    res.status(200).json({
        success: true,
        data: profile,
    });
};

//  @desc   Gets user profile with id
//  @route  GET /api/v1/profiles/:id
//  @access Private
//  @params profileId
module.exports.getProfile = async (req, res, next) => {
    const profileId = req.params.profileId;
    let profile = await Profile.findById(profileId);

    if (!profile) {
        return next(
            new AppError(`No Profile with id of ${profileId} is found`, 404)
        );
    }

    if (profile._userId.toString() !== req.user._id.toString()) {
        profile = profile.toObject();
        profile = _.omit(profile, ['friends', 'sentRequests', 'requests']);
    }

    res.status(200).json({
        success: true,
        data: profile,
    });
};

// TODO: CHECK IF ROUTE SHOULD BE BETTER

//  @desc   Gets user profile with username
//  @route  GET /api/v1/profiles/username/:username
//  @access Private
//  @params Username
module.exports.getProfileByUsername = async (req, res, next) => {
    const username = req.params.username;

    const profile = await Profile.findOne({ username });
    if (!profile)
        return next(
            new AppError(
                `No profile with this the username of ${username} exists`,
                404
            )
        );

    res.status(200).json({
        success: true,
        data: profile,
    });
};

//  @desc   Updates the Logged in user profile
//  @route  PUT /api/v1/profiles/
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
