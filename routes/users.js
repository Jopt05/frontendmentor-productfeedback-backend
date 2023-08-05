const { Router } = require('express');
const { check } = require('express-validator');
const { registerPost, loginPost } = require('../controllers/user');
const { validateFields, validateUsername, validateUser } = require('../middlewares/validate-fields');

const router = Router();

router.post(
    '/register', [
        check('username', 'Username is mandatory').not().isEmpty(),
        check('username').custom( validateUsername ),
        check('password', 'Password is mandatory').not().isEmpty(),
        check('fullname', 'fullname is mandatory').not().isEmpty(),
        validateFields
    ],
    registerPost
);

router.post(
    '/login', [
        check('username', 'Username is mandatory').not().isEmpty(),
        check('password', 'Password is mandatory').not().isEmpty(),
        check('username').custom( validateUser ),
        validateFields,
    ],
    loginPost
);

module.exports = router;