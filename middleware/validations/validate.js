const createUser = require('./createUser');

// Validation based on parameter
module.exports = (field) => {
    switch (field) {
        case 'createUser': return createUser();
    }

    next();
}