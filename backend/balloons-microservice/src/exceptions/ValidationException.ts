import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";

export class ValidationException extends BaseError {
  constructor(message, statusCode = HttpStatusCode.UNPROCESSABLE_ENTITY) {
    super(message, statusCode);
  }
}


