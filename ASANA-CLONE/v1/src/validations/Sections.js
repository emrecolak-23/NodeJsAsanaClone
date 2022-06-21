const Joi = require('joi')

const createValidation = Joi.object({
  name: Joi.string().required().min(3),
  project_id: Joi.string().required().min(8)
})

const updateValidations = Joi.object({
  name: Joi.string().required().min(3)
})

module.exports = {
  createValidation,
  updateValidations
}