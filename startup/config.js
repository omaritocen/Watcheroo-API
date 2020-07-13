const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
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
};
