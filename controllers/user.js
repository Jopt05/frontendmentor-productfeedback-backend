const { response } = require('express');
const generateJWT = require('../helpers/generateJWT');
const Usuario = require('../models/usuario');

const registerPost = async(req, res = response) => {

    const { username, password, fullname } = req.body;

    const user = new Usuario({username, password, fullName: fullname});

    await user.save();

    return res.status(200).json({
        ok: true,
        user
    });
    
}

const loginPost = async(req, res = response) => {

    const { username, password } = req.body;

    const user = await Usuario.findOne({
        username
    });
    
    if ( user.password != password ) {
        return res.status(400).json({
            ok: false,
            msg: "Password incorrect",
        });
    }

    const token = await generateJWT(user._id);

    return res.status(200).json({
        ok: true,
        token: token
    });
    
}

module.exports = {
    registerPost,
    loginPost
}