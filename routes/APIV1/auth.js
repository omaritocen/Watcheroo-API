const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        sucess: true,
        body: 'Main Page now',
    });
});

module.exports = router;
