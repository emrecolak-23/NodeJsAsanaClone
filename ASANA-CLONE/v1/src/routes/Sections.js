// Import Packages
const express = require('express');

// Import Middlewares
const {authenticateToken} = require('../middlewares/authenticate')
const validate = require('../middlewares/validate');
const idChecker = require('../middlewares/idChecker');

// Import Controllers
const Sections = require('../controllers/Sections');

// Import Validations
const schemas = require('../validations/Sections')

// Declare router
const router = express.Router();

router.route('/:projectId').get(idChecker('projectId'), authenticateToken, Sections.index)
router.route('/').post(authenticateToken, validate(schemas.createValidation), Sections.create)
router.route('/:id').patch(idChecker(), authenticateToken, validate(schemas.updateValidations), Sections.update)
router.route('/:id').delete(idChecker(), authenticateToken, Sections.deleteSection)

module.exports = router