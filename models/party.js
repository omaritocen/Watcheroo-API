const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },

    _guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },

    isCreatorReady: {
        type: Boolean,
        required: true,
    },

    isGuestReady: {
        type: Boolean,
        required: true,
    },

    createdAt: {
        type: Date,
        required: true,
    }
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;