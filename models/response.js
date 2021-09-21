const { Schema, model } = require('mongoose');

const ResponseSchema = Schema({
    author: {
        type: String,
        required: [true, 'Comment author is mandatory'],
    },
    authorMedia: {
        type: String,
        required: [true, 'Comment authorMedia is mandatory'],
    },
    description: {
        type: String,
        required: [true, 'Comment description is mandatory']
    }
})

module.exports = model( 'Response', ResponseSchema );