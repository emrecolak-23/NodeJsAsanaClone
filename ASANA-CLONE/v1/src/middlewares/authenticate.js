// Impport Packages
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(" ")[1] // ["Beaer", "skdlsfkdşkf"]

  if(token == null) return res.status(httpStatus.UNAUTHORIZED).send({error: 'Bu işlem için giriş yapmanız gerekmektedir.'})

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) return res.status(httpStatus.FORBIDDEN).send({error: 'Oturumunuz zaman aşımına uğradı.'})
    req.user = user?._doc
    next();
  })
}

module.exports = {
  authenticateToken
}