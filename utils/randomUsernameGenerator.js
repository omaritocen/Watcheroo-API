const crypto = require('crypto-random-string');

const Profile = require('../models/profile');

// Generates random username based on first and lastname
const generateUsername =  async (firstName, lastName) => {
    const maxLength = process.env.MAX_USERNAME_LENGTH;
    const fullName = `${firstName}${lastName}`;
    const count = maxLength - fullName.length;

    let username;
    if (count <= 0) {
        username = fullName.substring(0, maxLength - 1);
    } else {
        const random = crypto({length: 6})
        username = fullName.substring(0, 13) + '-' + random;
    }

    // TODO: MAKE SURE ITS UNIQUE
    //const profile = await Profile.findOne({username: username});
    //if (profile) generateUsername(firstName, lastName, maxLength);
    return username;
}

module.exports = generateUsername;