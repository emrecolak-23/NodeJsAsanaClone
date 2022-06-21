const Joi = require('joi')

const createValidations = Joi.object({
  title: Joi.string().required().min(3),
  section_id: Joi.string().required().min(8),
  project_id: Joi.string().required().min(8),

  description: Joi.string().min(5),
  assigned_to: Joi.string().min(8),
  statuses: Joi.array(),
  due_date: Joi.date(),
  order: Joi.number(),
  isCompleted: Joi.boolean(),
  comments: Joi.array(),
  media: Joi.array(),
  sub_task: Joi.array() 
})

const updateValidations = Joi.object({
  title: Joi.string().min(3),
  section_id: Joi.string().min(8),
  project_id: Joi.string().min(8),

  description: Joi.string().min(5),
  assigned_to: Joi.string().min(8),
  statuses: Joi.array(),
  due_date: Joi.date(),
  order: Joi.number(),
  isCompleted: Joi.boolean(),
  comments: Joi.array(),
  media: Joi.array(),
  sub_task: Joi.array() 

})

const commentValidation = Joi.object({
  comment: Joi.string().min(3)
})

module.exports = {
  createValidations,
  updateValidations,
  commentValidation
}