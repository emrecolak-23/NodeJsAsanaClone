// Import Packages
const mongoose = require('mongoose');

// Import Logger
const logger = require('../logger/Sections')

// Declare Schema
const Schema = mongoose.Schema;

// Declare SectionSchema
const SectionSchema = new Schema({
  name: {
    type: String
  },
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  order: Number
}, {timestamps: true, versionKey: false})

SectionSchema.post('save', (doc, next) => {
  logger.log({
    level: 'info',
    message: doc
  })
})

// Create Model
const SectionModel = mongoose.model('Section', SectionSchema);

module.exports = SectionModel