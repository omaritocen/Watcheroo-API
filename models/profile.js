const mongoose = require('mongoose');

const randomUsernameGenerator = require('../utils/randomUsernameGenerator');

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

    username: {
        type: String,
        minlength: 6,
        maxlength: process.env.MAX_USERNAME_LENGTH,
        unique: [true, 'Users must have unique usernames'],
        required: [true, 'Username must be provided'],
        match: [
            /^[a-zA-Z0-9_-]*$/,
            'Usernames can only contain numbers, letters, dashes and underscores',
        ],
    },

    photo: {
        type: String,
        default: 'no-photo.png',
    },

    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', }],

    sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
    
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
});

// Creates a random username before inserting into database
profileSchema.pre('validate', async function () {
    this.username = await randomUsernameGenerator(
        this.firstName,
        this.lastName
    );
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
