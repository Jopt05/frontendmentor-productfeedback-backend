const { validationResult } = require('express-validator');
const Comment = require('../models/comment');
const feedback = require('../models/feedback');
const Response = require('../models/response');

const validateFields = ( req, res, next ) => {

    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    };

    next();

}

const validateId = async(id = '') => {
    const existsId = await feedback.findById(id);
    if ( !existsId ) {
        throw new Error(`ID: ${id} does not exist`);
    }
}

const validateCommentId = async(id = '') => {
    const existsId = await Comment.findById(id);
    if ( !existsId ) {
        throw new Error(`ID: ${id} does not exist`);
    }
}

const validateResponseId = async(id = '') => {
    const existsId = await Response.findById(id);
    if ( !existsId ) {
        throw new Error(`ID: ${id} does not exist`);
    }
}

module.exports = {
    validateFields,
    validateId,
    validateCommentId,
    validateResponseId
}