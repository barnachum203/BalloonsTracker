import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";
export class UserNotFound extends BaseError {
    constructor(message, statusCode = HttpStatusCode.UNAUTHORIZED) {
      super(message, statusCode);
    }
  }