class ApiResponse {
  constructor(statusCode,data,messsgae='success'){
          this.statusCode = statusCode,
          this.data = data,
          this.messsgae = messsgae  
  }
}

module.exports = ApiResponse;