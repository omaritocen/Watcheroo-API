
const error = require('../middleware/error');
const nonExistingRoute = require('../middleware/nonExistingRoute');
const apiv1 = require('../routes/APIV1/index');

module.exports = function (app) {

    // Handle Routes to the first version of the api
    app.use('/api/v1', apiv1);

    app.all('*', nonExistingRoute);
    
    app.use(error)
};
