const mongoose = require('mongoose');
const Fawn = require('fawn/lib/fawn');

const Profile = require('../models/profile');
const AppError = require('../utils/AppError');
const { profile } = require('winston');

//  @desc   Gets the friends of a user by profile id
//  @route  GET /api/v1/profiles/:profileId/friends
//  @access Private
//  @params ProfileId
module.exports.getAllFriendsByProfileId = async (req, res, next) => {
    const profileId = req.params.profileId;
    const profile = await Profile.findById(profileId).populate({
        path: 'friends',
        select: 'username firstName lastName photo',
    });

    if (!profile) {
        return next(
            new AppError(`No Profile with id of ${profileId} is found`, 404)
        );
    }

    if (
        profile._userId.toString() !== req.user._id.toString() &&
        req.user.role != 'admin'
    ) {
        return next(
            new AppError('You cannot access friends of another user', 403)
        );
    }

    res.status(200).json({
        success: true,
        data: profile.friends,
    });
};

//  @desc   Gets the friends of a user by profile id
//  @route  POST /api/v1/profiles/:profileId/friend-request
//  @access Private
//  @params ProfileId
module.exports.addFriendRequest = async (req, res, next) => {
    const profileId = req.params.profileId;

    const targetProfile = await Profile.findById(profileId);

    if (!targetProfile) {
        return next(
            new AppError(`No Profile with id of ${profileId} is found`, 404)
        );
    }

    const currentUserProfile = await Profile.findOne({ _userId: req.user._id });

    if (profileId === currentUserProfile._id.toString()) {
        return next(
            new AppError('You can not send a friend request to yourself', 400)
        );
    }

    if (targetProfile.requests.includes(currentUserProfile._id)) {
        return next(
            new AppError('A Friend request is already sent to this user', 400)
        );
    }

    if (targetProfile.friends.includes(currentUserProfile._id)) {
        return next(
            new AppError(`You are already a friend with this user`, 400)
        );
    }

    const results = await new Fawn.Task()
        .update(
            Profile,
            { _id: targetProfile },
            { $push: { requests: currentUserProfile._id } }
        )
        .update(
            Profile,
            { _id: currentUserProfile },
            { $push: { sentRequests: targetProfile._id } }
        )
        .run({ useMongoose: true });

    res.status(201).json({
        sucess: true,
        data: `You have successfully sent a friend request to user ${targetProfile._id}`,
    });
};

//  @desc   Accepts or Declines a friend request
//  @route  POST /api/v1/profiles/:profileId/friend-request/:changeRequest
//  @access Private
//  @params profileId changeRequest
module.exports.changeRequestStatus = async (req, res, next) => {
    const profileId = req.params.profileId;
    const changeRequest = req.params.changeRequest.toString();

    const paramters = ['accept', 'decline'];
    if (!paramters.includes(changeRequest.toLowerCase())) {
        return next(
            new AppError(
                `Invalid request parameter, please use accept or decline`,
                400
            )
        );
    }

    const isAccept = changeRequest === 'accept' ? true : false;

    const targetProfile = await Profile.findById(profileId);

    if (!targetProfile) {
        return next(
            new AppError(`No Profile with id of ${profileId} is found`, 404)
        );
    }

    const currentUserProfile = await Profile.findOne({ _userId: req.user._id });

    if (!currentUserProfile.requests.includes(profileId)) {
        return next(
            new AppError(`You have no incomming request from this user`, 400)
        );
    }

    const results = await new Fawn.Task()
        .update(
            Profile,
            { _id: targetProfile },
            {
                $pull: { sentRequests: currentUserProfile._id },
                $push: isAccept ? { friends: currentUserProfile._id } : {},
            }
        )
        .update(
            Profile,
            { _id: currentUserProfile },
            {
                $pull: { requests: targetProfile._id },
                $push: isAccept ? { friends: targetProfile._id } : {},
            }
        )
        .run({ useMongoose: true });

    const message = `You have ${isAccept ? 'accepted' : 'declined'} user ${
        targetProfile._id
    } succesfully`;
    res.status(200).json({
        sucess: true,
        data: message,
    });
};

//  @desc   Removes a friend from friends list
//  @route  DELETE /api/v1/profiles/:profileId/friend-request/
//  @access Private
//  @params profileId 
module.exports.deleteFriend = async (req, res, next) => { 
    const profileId = req.params.profileId;

    const targetProfile = await Profile.findById(profileId);

    if (!targetProfile) {
        return next(
            new AppError(`No Profile with id of ${profileId} is found`, 404)
        );
    }

    const currentUserProfile = await Profile.findOne({ _userId: req.user._id });

    if (profileId === currentUserProfile._id.toString()) {
        return next(
            new AppError('You can not delete yourself from your friends', 400)
        );
    }

    if (!targetProfile.friends.includes(currentUserProfile._id)) {
        return next(
            new AppError(`You are not a friend with this user`, 400)
        );
    }

    const results = await new Fawn.Task()
        .update(
            Profile,
            { _id: targetProfile },
            { $pull: { friends: currentUserProfile._id } }
        )
        .update(
            Profile,
            { _id: currentUserProfile },
            { $pull: { friends: targetProfile._id } }
        )
        .run({ useMongoose: true });

    res.status(200).json({
        sucess: true,
        data: `You have successfully unfriended user with id of ${targetProfile._id}`,
    });
};