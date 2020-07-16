const mongoose = require('mongoose');

const maxUsernameLength = 20;
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

    // username: {
    //     type: String,
    //     minlength: 6,
    //     maxlength: maxUsernameLength,
    //     unique: [true, 'Users must have unique usernames'],
    //     required: [true, 'Username must be provided'],
    // },

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

// profileSchema.pre('save', function() {
//     const fullName = `${this.firstName}${this.lastName}`;

//     this.username = maxUsernameLength - fullName.length;
// });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
