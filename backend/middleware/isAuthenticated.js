const User = require("../model/authModel");
const ErrorHandler = require("../utils/error")
const jwt = require("jsonwebtoken");


exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token

    if(!token) 
        return next(new ErrorHandler('Login first to handle resources',401))

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
    req.user = await User.findById(decoded.id)
    next()
}