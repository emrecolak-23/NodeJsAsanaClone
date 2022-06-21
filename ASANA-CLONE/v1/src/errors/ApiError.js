class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.status = statusCode
  }

  static notFound(){
    this.message = 'Böyle bir kayıt bulunmamaktadır'
    this.status = 404
  } // ApiError.notFound() can be operated in controllers

}

module.exports = ApiError;