const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    _userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    firstName: {
        type: String,
        trim: true,
        required: [true, 'First Name Must be provided.'],
    },

    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name Must be provided.'],
    },

    photo: {
        type: String,
        default: 'no-photo.png',
    },

    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friend',
        },
    ],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
