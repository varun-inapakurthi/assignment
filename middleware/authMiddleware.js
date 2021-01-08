const jwt = require('jsonwebtoken');

const User = require('./../models/userModel.js');


const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user = await User.findById(decoded.id).select('-password')
            next()

        } catch (error) {
            res.status(401).json("Not authorized")
        }
    } else {
        res.status(401).json("Not authorized")

    }
}

const isSeller = (req, res, next) => {
    if (req.user && req.user.typeOfUser === 'seller') {
        next()
    } else {
        res.status(401).json("Not authorized as a seller")
    }
}

module.exports = { protect, isSeller }