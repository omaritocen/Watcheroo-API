const express = require('express');
const router = express.Router();

const {
    createParty,
    getParty,
    updateParty,
    getParties
} = require('../../controller/partyController');

const auth = require('../../middleware/auth');
const validBody = require('../../middleware/validBody');
const validateObjectId = require('../../middleware/validations/validateObjectId');

router.use(auth);

router.param('partyId', validateObjectId);

router.route('/:partyId').get(getParty).put(updateParty);

router
    .route('/')
    .post(validBody('createParty'), createParty)
    .get(getParties);

module.exports = router;
