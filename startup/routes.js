const express = require('express');

const apiv1 = require('../routes/APIV1/index');

module.exports = function (app) {
    // Allowing the server to parse json
    app.use(express.json());

    // Handle Routes to the first version of the api
    app.use('/api/v1', apiv1);

    
    // TODO: HANDLE ERRORS AND UNDEFINED ROUTES
};
