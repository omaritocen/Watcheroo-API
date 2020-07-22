const express = require('express');
const router = express.Router();

const {
    getMe,
    getAllProfiles,
    updateProfile,
    getProfile,
    getProfileByUsername,
} = require('../../controller/profileController');

const validBody = require('../../middleware/validBody');
const validateObjectId = require('../../middleware/validations/validateObjectId');
const auth = require('../../middleware/auth');
const friends = require('./friends');
const friendRequests = require('./friendRequests');
const { route } = require('./friends');

router.use(auth);

router.param('profileId', validateObjectId);

// Migrate to other routes with these URLs
router.use('/:profileId/friends', friends);
router.use('/:profileId/friend-request', friendRequests);

router.route('/').get(getAllProfiles);

router.route('/me').get(getMe).put(validBody('updateProfile'), updateProfile);

router.get('/:profileId', getProfile);

router.get('/username/:username', getProfileByUsername);

module.exports = router;
