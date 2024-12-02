// userModel
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// jwt Creation
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET)
}

// Sign up
const signupUser = async (req,res) => {
    const {username, password} = req.body;


    try {
        // Sign up Method created in userModel
        const user = await User.signup(
            username, 
            password,
        )

        // Create token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Login
const loginUser = async (req,res) => {
    const {username, password} = req.body;

    try {
        // Sign up Method created in userModel
        const user = await User.login(username, password)
        // Create token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {signupUser, loginUser}