import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";
export class UpdateException extends BaseError {
    constructor(message, statusCode = HttpStatusCode.BAD_REQUEST) {
      super(message, statusCode);
    }
  }