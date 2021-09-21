const { response } = require('express');
const Comment = require('../models/comment');
const Feedback = require('../models/feedback');

const commentGetId = async(req, res = response) => {

    const { id } = req.params;

    const comment = await Comment.findById(id).populate('responses');

    res.status(200).json({
        ok: true,
        comment
    });
}

// Creates new comment and links it into feedback post (receives feedback id)
const commentPost = async(req, res = response) => {

    const { id } = req.params

    const body = req.body;

    const comment = new Comment(body);

    await comment.save();

    const feedback = await Feedback.findById(id);

    feedback.comments.push(comment._id);

    await feedback.save();

    res.status(200).json({
        ok: true,
        comment
    });
}

const commentDelete = async(req, res = response) => {

    const { id } = req.params;

    const comment = await Comment.findByIdAndDelete(id);

    res.status(200).json({
        ok: true,
    });
}

module.exports = {
    commentPost,
    commentDelete,
    commentGetId
}