const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const logger = require('../logger/logger');
require('express-async-errors');

// Loading environment variables
dotenv.config({ path: './config/config.env' });

module.exports = (app) => {
    // Allow application to parse JSON
    app.use(express.json());

    // Log user requests during development
    if (process.env.NODE_ENV == 'development') {
        app.use(morgan('dev'));
    }

    process.on('unhandledRejection', (ex) => {
        console.log(ex);
        throw ex;
    });

    // process.on('uncaughtException', (ex) => {
    //     console.log(ex.message, ex);
    //     //throw ex;
    //     process.exit(1);
    // });

    // process.on('unhandledRejection', (ex) => {
    //     console.log(ex.message, ex);
    //     //throw ex;
    //     process.exit(1);
    // });

};
