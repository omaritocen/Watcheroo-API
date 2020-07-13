
//  @desc   Registers a new user into the server      
//  @route  POST /api/v1/auth/signup
//  @access Public
//  @param  Email Password FullName
module.exports.signUp = (req, res, next) => {

    res.json({ success: true });
};
