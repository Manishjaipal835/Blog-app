class ApiErros extends Error{
       
  constructor(
        statusCode,
        message="something went wrong",
        errors =[]
       ){
        this.statusCode = statusCode,
        this.message = message,
        this.errors = this.erros
       }
}

module.exports = ApiErros