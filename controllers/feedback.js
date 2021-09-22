const { response } = require('express');
const { check } = require('express-validator');
const Feedback = require('../models/feedback');

const feedbackGet = async(req, res = response) => {

    const feedbacks = await Feedback.find().populate();

    res.status(200).json({
        feedbacks
    })

}

const feedbackIdGet = async(req, res = response ) => {

    const { id } = req.params;

    const feedback = await Feedback.findById(id)
    .populate({
        path: "comments",
        populate: {
            path: "responses"
        }
    });

    res.status(200).json({
        ok: true,
        feedback
    })

}

const feedbackPost = async(req, res = response) => {

    const body = req.body;

    const feedback = new Feedback(body);

    await feedback.save();

    res.status(200).json({
        ok: true,
        feedback
    })
    
}

const feedbackPut = async(req, res = response) => {

    const { id } = req.params;

    const { ...rest } = req.body;

    const feedback = await Feedback.findByIdAndUpdate( id, rest );

    res.status(200).json({
        ok: true,
        feedback
    });
}

module.exports = {
    feedbackGet,
    feedbackPost,
    feedbackPut,
    feedbackIdGet
}