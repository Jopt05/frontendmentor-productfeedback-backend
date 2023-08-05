const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
const Comment = require('../models/comment');
const feedback = require('../models/feedback');
const Response = require('../models/response');
const Usuario = require('../models/usuario');

const validateFields = ( req, res, next ) => {

    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    };

    next();

}

const validateJWT = ( req, res, next ) => {

    const token = req.header('Authorization');

    if ( !token ) {
        return res.status(403).json({
            ok: false,
            msg: 'There is no token on request. Authorzation'
        });
    };

    try {
        jwt.verify( token, process.env.SECRET_JWT );

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Invalid token"
        })
    }

}

const validateUser = async(username) => {
    const userExists = await Usuario.findOne({
        username
    });

    if( !userExists ) {
        throw new Error(`Username: ${username} doesnt exist`);
    }
}

const validateUsername = async( username ) => {

    const existsEmail = await Usuario.findOne({
        username: username
    });

    if( existsEmail ) {
        throw new Error(`Username: ${username} already exists`);
    }

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
    validateResponseId,
    validateUsername,
    validateJWT,
    validateUser
}