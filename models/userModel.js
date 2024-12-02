const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// Sign Up Method
userSchema.statics.signup = async function (username, password) {
    // No Username or Password entered
    if (!username || !password) {
        throw new Error ('All fields must be filled in')
    }

    // Checking username is valid
    if (!validator.isAlphanumeric(username) || !validator.isLength(username, { min: 3, max: 15 })) {
        throw Error ('Username is not valid. Must be between 3 - 15 characters and contain either letters or numbers')
    }

    // Checking password if it's strong
    if (!validator.isStrongPassword(password)) {
        throw Error ('Password is not strong enough. Please make sure it contains - min 8 characters, min 1 uppercase, min 1 number, min 1 symbol')
    }

    // Check if username is in use
    const exists = await this.findOne({username})

    if (exists) {
        throw Error ('Username is already in use')
    }

    // Password encryption
    // --- Salt --- //
    const salt = await bcrypt.genSalt(10);
    // --- hash by combining the password & salt --- //
    const hash = await bcrypt.hash(password, salt);
    // --- Set password to hash value for the created user
    const user = await this.create({username, password:hash})

    return user
}

// Login Method
userSchema.statics.login = async function (username, password) {
    // No Username or Password entered
    if (!username || !password) {
        throw Error ('All fields must be filled in')
    }

    // Is there a user with that username in the database
    const user = await this.findOne({username})

    // No user found
    if (!user) {
        throw Error('Username Is Incorrect')
    }

    // Compare password with the user
    const match = await bcrypt.compare(password, user.password)

    // Password does not match username
    if (!match) {
        throw Error ('Incorrect Password Entered')
    }

    // If it matches
    return user
}

module.exports = mongoose.model('User', userSchema)