module.exports = (err, req, res, next) => {

    const errorResponse = err.errorsObject ? err.errorsObject : err.message;

    res.status(err.statusCode).json({
        success: false,
        error: errorResponse
    });
};
