// Import Packages
const mongoose = require('mongoose');

// Import Logger
const logger = require('../logger/Projects');

// Create Schema
const Schema = mongoose.Schema;

// Create Project Schema
const ProjectSchema = new Schema({
  name: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {timestamps: true, versionKey: false})

ProjectSchema.post('save', (doc, next)=>{
  // Loglama yapılacak
  logger.log({
    level: 'info',
    message: doc
  })
  next();
})

// Create Project Model
const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel
