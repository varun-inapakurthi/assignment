const User = require('./../models/userModel');

const generateToken = require('./../utils/generateToken')


exports.registerUser = async (req, res) => {
    try {

        const { typeOfUser, password, username } = req.body
        let userExists = await User.findOne({ username })
        if (userExists) {
            return res.json({
                message: "User already exists"
            })
        }
        let user = await User.create({ username, typeOfUser: typeOfUser.toLowerCase(), password })
        if (user) {
            res.json(user)
        }
    } catch (error) {

        res.json(error)

    }
}
exports.loginUser = async (req, res) => {
    try {

        const { username, password } = req.body
        let user = await User.findOne({ username })
        if (user && await (user.matchPasssword(password))) {
            let token = generateToken(user._id)
            res.json({ user, token })
        } else {
            res.json("Invalid Credentials")
        }

    } catch (error) {

        res.json(error)

    }
}