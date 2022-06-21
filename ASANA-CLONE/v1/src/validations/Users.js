// Import Packages
const Joi = require('joi');

// validations
const registerValidation = Joi.object({
  full_name: Joi.string().required().min(5),
  password: Joi.string().required().min(6),
  email: Joi.string().email().required(),
})

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6)
})

const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required()
})

const updateValidation = Joi.object({
  full_name: Joi.string().min(3),
  email: Joi.string().email().min(8)
})

const changePasswordValidation = Joi.object({
  password: Joi.string().required().min(6)
})

module.exports = {
  registerValidation,
  loginValidation,
  resetPasswordValidation,
  updateValidation,
  changePasswordValidation
}