const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 15,
        trim: true,
        required: [true, 'Please enter the user first name'],
    },
    lastName: {
        type: String,
        maxlength: 15,
        trim: true,
        required: [true, 'Please enter the user last name'],
    },
    email: {
        type: String,
        maxlength: 320,
        unique: [true, 'Email address ia already in use'],
        trim: true,
        required: [true, 'Please enter an email address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        maxlength: 255,
        required: [true, 'Please provide a user password'],
        minlength: 6,
        select: false, // NOT TO INCLUDE IT WHEN FETCHING USER
    },
    role: {
        type: String,
        enum: ['watcher', 'admin'],
        default: 'watcher',
    },
});


// Generates JsonWebToken for the user to use in protected routes
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );

    return token;
};

// Makes sure entered password matches hash in the database
userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// Hashes the password before saving it into the database
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
