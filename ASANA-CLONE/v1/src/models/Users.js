// Import Packages
const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema;

// Create UserSchema
const UserSchema = new Schema({
  full_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profile_image: {
    type: String
  }
}, {timestamps: true, versionKey: false})

// Create UserModel
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;