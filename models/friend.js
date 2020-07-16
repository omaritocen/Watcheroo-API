const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    _userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    status: {
        required: true,
        type: Number,
        enums: [0, 1, 2, 3],
        // 0 Pending Friend Request sent
        // 1 Incomming Friend request
        // 2 Friends
        // 3 Blocked
    },
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
