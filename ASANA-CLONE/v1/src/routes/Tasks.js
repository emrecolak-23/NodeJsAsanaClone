// Import Packages
const express = require('express');

// Import Middlewares
const validate = require('../middlewares/validate');
const {authenticateToken} = require('../middlewares/authenticate');
const idChecker = require('../middlewares/idChecker');

// Import Validations
const schemas = require('../validations/Tasks');

// Import Controllers
const {index, create, update, deleteTask, makeComment, deleteComment,makeSubTask, fetchTask} = require('../controllers/Tasks')

// Declare router
const router = express.Router()

router.route('/').get(authenticateToken, index)
router.route('/:id').get(idChecker(), authenticateToken, fetchTask)
router.route('/').post(authenticateToken, validate(schemas.createValidations), create);
router.route('/:id').patch(idChecker(), authenticateToken, validate(schemas.updateValidations), update);
router.route('/:id').delete(idChecker(), authenticateToken, deleteTask)

router.route('/:id/make-comment').post(idChecker(), authenticateToken, validate(schemas.commentValidation), makeComment)
router.route('/:id/delete-comment').post(idChecker(), authenticateToken, deleteComment)

router.route('/:id/add-sub-task').post(idChecker(), authenticateToken, validate(schemas.createValidations), makeSubTask)

module.exports = router
