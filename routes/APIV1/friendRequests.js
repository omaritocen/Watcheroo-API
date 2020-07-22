const express = require('express');

const router = express.Router({ mergeParams: true });

const {
    addFriendRequest,
    changeRequestStatus,
} = require('../../controller/friendsController');

router.route('/').post(addFriendRequest);

router.post('/:changeRequest', changeRequestStatus);

module.exports = router;
