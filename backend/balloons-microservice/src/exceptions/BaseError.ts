import { HttpStatusCode } from "../enums/HttpStatusCode";

export class BaseError extends Error {
  statusCode: HttpStatusCode;

  constructor(message, statusCode) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}


