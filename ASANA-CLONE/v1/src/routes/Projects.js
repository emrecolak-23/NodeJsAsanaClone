// Import Packages
const express = require('express');

// Import valitadions
const schemas = require('../validations/Projects');
// Import middlewares
const validate = require('../middlewares/validate');
const {authenticateToken} =require('../middlewares/authenticate')
const idChecker = require('../middlewares/idChecker');
// Import Controllers
const Projects = require('../controllers/Projects');

// Declare router
const router = express.Router()

// Routes
router.route('/').post(authenticateToken, validate(schemas.createValidation), Projects.create)
router.route('/:id').patch(idChecker(), authenticateToken, validate(schemas.updateValidation), Projects.update )
router.route('/:id').delete(idChecker(), authenticateToken, Projects.remove)
router.route('/').get(authenticateToken, Projects.index)

module.exports = router