const { Router } = require('express');
const { check } = require('express-validator');
const { feedbackGet, feedbackPost, feedbackPut, feedbackIdGet } = require('../controllers/feedback');
const { validateFields, validateId } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', feedbackGet)

router.get('/:id', [
    check('id', "That's not a valid ID").isMongoId(),
    check('id').custom( validateId ),
    validateFields
],feedbackIdGet)

router.post('/',[
    check('title', 'Feedback title is mandatory').not().isEmpty(),
    check('description', 'Feedback description is mandatory').not().isEmpty(),
    check('tags', 'Feedback tags are mandatory').not().isEmpty(),
    check('tags', 'Those arent valid tags').isIn(["UI", "UX", "Enhancement", "Bug", "Feature"]),
    validateFields
], feedbackPost);

router.put('/:id', [
    check('id', "That's not a valid ID").isMongoId(),
    check('id').custom( validateId ),
    validateFields
]
,feedbackPut)

module.exports = router;