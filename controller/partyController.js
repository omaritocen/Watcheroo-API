const _ = require('lodash');

const Party = require('../models/party');
const Profile = require('../models/profile');
const AppError = require('../utils/AppError');

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
    res.status(201).json({
        success: true,
        data: party,
    });
};
