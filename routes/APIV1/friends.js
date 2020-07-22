const express = require('express');

const router = express.Router({ mergeParams: true });

const { getAllFriendsByProfileId, deleteFriend } = require('../../controller/friendsController');

//TODO: Handle Sending a request to user who has already sent you one

router.get('/', getAllFriendsByProfileId);

router.delete('/:profileId', deleteFriend);

module.exports = router;
