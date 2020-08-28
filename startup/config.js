const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path'); 
const logger = require('../logger/logger');
const fileUpload = require('express-fileupload');
require('express-async-errors');

// Loading environment variables
dotenv.config({ path: './config/config.env' });

module.exports = (app) => {
    // Allow application to parse JSON
    app.use(express.json());

    // Allow application to upload files
    app.use(fileUpload());

    require('./firebaseAdmin');

    // Log user requests during development
    if (process.env.NODE_ENV == 'development') {
        app.use(morgan('dev'));
    }

    process.on('unhandledRejection', (ex) => {
        console.log(ex);
        throw ex;
    });
};
