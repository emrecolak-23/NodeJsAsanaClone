// Import Packages
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const passwordToHash = (password) => {
  return  CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString()
}

const generateAccessToken = (user) => {
  return jwt.sign({name: user.full_name, ...user}, process.env.ACCESS_TOKEN_KEY, {expiresIn: "1w"})
}

const generateRefreshToken = (user) => {
  return jwt.sign({name: user.full_name, ...user}, process.env.REFRESH_TOKEN_KEY)
}

module.exports = {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken
}