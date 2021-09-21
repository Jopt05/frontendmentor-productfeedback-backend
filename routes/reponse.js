const { Router } = require('express');
const { check } = require('express-validator');
const { responsePost, responseDelete } = require('../controllers/response');
const { validateFields, validateId, validateCommentId, validateResponseId } = require('../middlewares/validate-fields');

const router = Router();

// Creates a response and links it into comment (receives comment id)
router.post('/:id', [
    check('author', 'Author is mandatory').not().isEmpty(),
    check('authorMedia', 'Author media is mandatory').not().isEmpty(),
    check('description', 'Description is mandatory').not().isEmpty(),
    check('id', "That's not a valid ID").isMongoId(),
    check('id').custom( validateCommentId ),
    validateFields
],responsePost);

// Deletes response (receives response id )
router.delete('/:id', [
    check('id', "That's not a valid ID").isMongoId(),
    check('id').custom( validateResponseId ),
    validateFields
],responseDelete);

module.exports = router;