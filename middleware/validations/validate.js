const createUser = require('./createUser');
const loginUser = require('./loginUser');
const updateProfile = require('./updateProfile');
const createParty = require('./createParty');


// Validation based on parameter
module.exports = (field) => {
    switch (field) {
        // User Validations
        case 'createUser': return createUser();
        case 'loginUser': return loginUser();

        // Profile Validations
        case 'updateProfile': return updateProfile();

        // Party Validations
        case 'createParty': return createParty();
    }

    next();
}