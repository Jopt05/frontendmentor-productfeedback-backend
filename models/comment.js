const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
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
    },
    responses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Response'
        }
    ]
})

module.exports = model( 'Comment', CommentSchema );