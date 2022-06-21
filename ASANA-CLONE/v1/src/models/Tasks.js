// Import Packages
const mongoose = require('mongoose');

// Import logger
const logger = require('../logger/Tasks')

// Declare Schema
const Schema = mongoose.Schema

// Declate TaskSchema 
const TaskSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  due_date: {
    type: Date
  },
  statuses: [String],
  section_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isCompleted: Boolean,
  comments: [
    {
      comment: String,
      commented_at: Date,
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  media: [String],
  sub_tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
}, {timestamps: true, versionKey: false})

TaskSchema.post('save', (doc,next) => {
  logger.log({
    level: 'info',
    message: doc
  })
  next();
})

// Create Task Model
const TaskModel = mongoose.model('Task', TaskSchema)

module.exports = TaskModel