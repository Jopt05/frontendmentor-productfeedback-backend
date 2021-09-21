const { Schema, model } = require('mongoose');

const FeedbackSchema = Schema({
    title: {
        type: String,
        required: [true, 'Feedback title is mandatory'],
    },
    description: {
        type: String,
        required: [true, 'Feedback description is mandatory']
    },
    tags: {
        type: [String],
        required: true,
        enum: ["UI", "UX", "Enhancement", "Bug", "Feature"],
    },
    status: {
        type: String,
        required: false,
        enum: ["Planned", "Progress", "Live"],
        default: "Planned"
    },
    votes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

module.exports = model( 'Feedback', FeedbackSchema );