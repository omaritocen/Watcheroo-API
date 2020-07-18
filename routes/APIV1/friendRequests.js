const express = require('express');

const router = express.Router({ mergeParams: true });

const {
    addFriendRequest,
    changeRequestStatus,
    deleteFriend,
} = require('../../controller/friendsController');

router.route('/').post(addFriendRequest).delete(deleteFriend);

router.post('/:changeRequest', changeRequestStatus);

module.exports = router;
