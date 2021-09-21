const { response } = require('express');
const Comment = require('../models/comment');
const Response = require('../models/response');

const responsePost = async(req, res = response) => {

    const { id } = req.params;

    const body = req.body;

    const resp = new Response(body);

    await resp.save();

    const comment = await Comment.findById(id);

    comment.responses.push( resp._id );

    await comment.save();

    res.status(200).json({
        ok: true,
        resp
    })
}

const responseDelete = async(req, res = response) => {
    const { id } = req.params;

    const resp = await Response.findByIdAndDelete(id);

    res.status(200).json({
        ok: true,
    });
}

module.exports = {
    responsePost,
    responseDelete
}