const express = require('express');

const router = express.Router({ mergeParams: true });

const { getAllFriendsByProfileId } = require('../../controller/friendsController');

router.get('/', getAllFriendsByProfileId);

module.exports = router;
