const _ = require('lodash');

const Profile = require('../models/profile');
const AppError = require('../utils/AppError');
const AdvancedResults = require('../utils/AdvancedResults');

//  @desc   Gets All Profiles with query
//  @route  GET /api/v1/profiles
//  @access Private
module.exports.getAllProfiles = async (req, res, next) => {
    const advancedResult = new AdvancedResults(
        Profile,
        Profile.find(),
        req.query
    );

    let results = await (
        await advancedResult
            .filter()
            .select(['friends', 'requests', 'sentRequests'])
            .sort()
            .paginate()
    ).getResults();
    
    res.status(200).json({
        success: true,
        results,
    });
};

//  @desc   Returns the Logged in user profile
//  @route  GET /api/v1/profiles/me
//  @access Private
module.exports.getMe = async (req, res, next) => {
    const profile = await Profile.findOne({ _userId: req.user._id }).populate({
        path: 'friends requests sentRequests',
        select: 'username firstName lastName photo',
    });

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
    let profile = await Profile.findById(profileId).select(
        '-friends -sentRequests -requests'
    );

    if (!profile) {
        return next(
            new AppError(`No Profile with id of ${profileId} is found`, 404)
        );
    }

    // if (profile._userId.toString() !== req.user._id.toString()) {
    //     profile = profile.toObject();
    //     profile = _.omit(profile, ['friends', 'sentRequests', 'requests']);
    // }

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

    const profile = await Profile.findOne({ username }).populate({
        path: 'friends',
    });
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
//  @route  PUT /api/v1/profiles/me
//  @access Private
module.exports.updateProfile = async (req, res, next) => {
    const body = _.pick(req.body, ['firstName', 'lastName', 'username']);

    const profile = await Profile.findOneAndUpdate(
        { _userId: req.user._id },
        body,
        {
            new: true,
        }
    ).populate({
        path: 'friends requests sentRequests',
        select: 'username firstName lastName photo',
    });

    res.status(200).json({
        success: true,
        data: profile,
    });
};
