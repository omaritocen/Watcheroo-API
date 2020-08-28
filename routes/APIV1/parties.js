const express = require('express');
const router = express.Router();

const {
    createParty,
    getParty,
    getPrevParties,
} = require('../../controller/partyController');

const auth = require('../../middleware/auth');
const validBody = require('../../middleware/validBody');
const validateObjectId = require('../../middleware/validations/validateObjectId');

router.use(auth);

router.param('partyId', validateObjectId);

router.get('/:partyId', getParty);

router
    .route('/')
    .post(validBody('createParty'), createParty)
    .get(getPrevParties);

module.exports = router;
