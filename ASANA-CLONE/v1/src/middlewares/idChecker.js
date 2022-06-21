// Import Packages
const httpStatus = require('http-status');

// Import Error
const ApiError = require('../errors/ApiError');

const idChecker = (field) => (req, res, next) => {
  const idField = field || "id"
  if(!req.params[idField].match(/^[0-9a-fA-F]{24}$/)) {
    next(new ApiError('Lütfen geçerli bir id bilgisi giriniz', httpStatus.BAD_REQUEST))
    return;
  }
  next();
}

module.exports = idChecker