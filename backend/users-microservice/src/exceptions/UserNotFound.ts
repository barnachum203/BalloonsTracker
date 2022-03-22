import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";
export class UserNotFound extends BaseError {
    constructor(message, statusCode = HttpStatusCode.NOT_FOUND) {
      super(message, statusCode);
    }
  }