const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    maxlength: 50,
    required: [true, 'Please enter the user full name'],
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

const User = mongoose.model('User', userSchema);

module.exports = User;