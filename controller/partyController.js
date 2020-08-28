const _ = require('lodash');

const Party = require('../models/party');
const Profile = require('../models/profile');
const User = require('../models/user');

const AppError = require('../utils/AppError');
const notification = require('../utils/notification');

//  @desc   Gets a single party that a user is enrolled in
//  @route  GET /api/v1/parties/:id
//  @access Private
module.exports.getParty = async (req, res, next) => {
    const partyId = req.params.partyId;
    const party = await Party.findById(partyId);

    if (!party) {
        return next(
            new AppError(`No party with the id of ${partyId} IS found`, 404)
        );
    }

    const profile = await Profile.findOne({ _userId: req.user._id });

    if (
        profile._id.toString() != party._guest.toString() &&
        profile._id.toString() != party._creator.toString()
    ) {
        return next(
            new AppError(
                'You are only allowed to access a party that you created or invited to',
                403
            )
        );
    }

    res.status(200).json({
        success: true,
        data: party,
    });
};

//  @desc   Creates a new party
//  @route  POST /api/v1/parties
//  @access Private
module.exports.createParty = async (req, res, next) => {
    const reqBody = _.pick(req.body, ['_guest', 'movieName']);

    const userId = req.user._id;
    const profile = await Profile.findOne({ _userId: userId });

    if (!profile.friends.includes(reqBody._guest)) {
        return next(
            new AppError(
                'You must be friends with person to invite him to your party',
                400
            )
        );
    }

    reqBody._creator = profile._id;

    const party = await Party.create(reqBody);

    const guestProfile = await Profile.findById(reqBody._guest).select(
        '-friends -sentRequests -requests'
    );

    const guestUser = await User.findById(guestProfile._userId).select(
        'fcmToken'
    );

    const data = {
        screen: '/accept-invitation',
        roomId: profile._id.toString(),
        friendId: guestProfile._id.toString(),
        partyId: party._id.toString(),
    };

    if (guestUser.fcmToken) {
        notification.sendNotificationWithData(
            'New Invitation',
            `${profile.firstName} ${profile.lastName} has invited you to watch "${party.movieName}"`,
            guestUser.fcmToken,
            data
        );
    }

    res.status(201).json({
        success: true,
        data: party,
    });
};

//  @desc   Gets done parties which user was enrolled in
//  @route  GET /api/v1/parties/
//  @access Private
module.exports.getPrevParties = async (req, res, next) => {
    const userId = req.user._id;
    const profile = await Profile.findOne({ _userId: userId });

    const parties = await Party.find({
        $and: [
            { $or: [{ _creator: profile._id }, { _guest: profile._id }] },
            { status: 'done' },
        ],
    });

    if (!parties) {
        return res.status(200).send({success: true,count:0, data: []});
    }

    res.status(200).send({
        success: true,
        count: parties.length,
        data: parties
    });
};
