import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";
export class InternalServerError extends BaseError {
    constructor(message, statusCode = HttpStatusCode.INTERNAL_SERVER) {
      super(message, statusCode);
      this.name = 'InternalServerError';
    }
  }