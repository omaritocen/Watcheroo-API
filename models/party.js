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

    movieName: {
        type: String,
        minLength: 1,
        required: true,
    },

    status: {
        type: String,
        enum: ['waiting', 'accepted', 'declined'],
        required: true,
    },
    
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
