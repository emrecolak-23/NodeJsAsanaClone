// Import Packages
const express = require('express');

// Import Controller
const Users = require('../controllers/Users');
const {authenticateToken} = require('../middlewares/authenticate')
// Import Middlewares
const validate = require('../middlewares/validate');
const idChecker = require('../middlewares/idChecker');

// Import Validations
const schemas = require('../validations/Users')

// Create Router
const router = express.Router();

router.route('/').get(Users.index)
router.route('/:id').delete(idChecker, authenticateToken, Users.remove)
router.route('/').patch(authenticateToken, validate(schemas.updateValidation) ,Users.update)
router.route('/register').post(validate(schemas.registerValidation), Users.create)
router.route('/login').post(validate(schemas.loginValidation), Users.login)
router.route('/projects').get(authenticateToken, Users.projectList)
router.route('/reset-password').post(validate(schemas.resetPasswordValidation), Users.resetPassword)
router.route('/change-password').post(authenticateToken,validate(schemas.changePasswordValidation), Users.changePassword)
router.route('/update-profile-image').post(authenticateToken, Users.updateProfileImage)
module.exports = router
