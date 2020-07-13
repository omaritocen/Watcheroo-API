
const error = require('../middleware/error');
const apiv1 = require('../routes/APIV1/index');

module.exports = function (app) {

    // Handle Routes to the first version of the api
    app.use('/api/v1', apiv1);

    
    // TODO: HANDLE ERRORS AND UNDEFINED ROUTES
    app.use(error)
};
