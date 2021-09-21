const { Router } = require('express');
const { check } = require('express-validator');
const { commentPost, commentDelete, commentGetId } = require('../controllers/comment');
const { validateFields, validateId, validateCommentId } = require('../middlewares/validate-fields');

const router = Router();

router.get('/:id', [
    check('id', "That's not a valid ID").isMongoId(),
    check('id').custom( validateCommentId ),
    validateFields
],commentGetId)

// Creates new comment and links it into feedback post (receives feedback id)
router.post('/:id', [
    check('author', 'Author is mandatory').not().isEmpty(),
    check('authorMedia', 'Author media is mandatory').not().isEmpty(),
    check('description', 'Description is mandatory').not().isEmpty(),
    check('id', "That's not a valid ID").isMongoId(),
    check('id').custom( validateId ),
    validateFields
],commentPost)

// Deletes comment by id 
router.delete('/:id',[
    check('id', "That's not a valid ID").isMongoId(),
    check('id').custom( validateCommentId ),
    validateFields
], commentDelete)

module.exports = router;