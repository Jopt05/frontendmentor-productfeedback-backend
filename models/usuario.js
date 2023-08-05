const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: {
        type: String,
        required: [
            true,
            'Username is mandatory'
        ]
    },
    password: {
        type: String,
        required: [
            true,
            'Password is mandatory'
        ]
    },
    fullName: {
        type: String,
        required: [
            true,
            'Full name is mandatory'
        ]
    }
})

module.exports = model( 'Usuario', UserSchema );