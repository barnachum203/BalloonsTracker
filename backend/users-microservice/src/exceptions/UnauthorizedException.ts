export class UnauthorizedException extends Error {
    constructor (message) {
      super(message)
      this.name = 'UnauthorizedException'
      const httpStatusCode = 401
    //   this.httpStatusCode = 401
    }
  }