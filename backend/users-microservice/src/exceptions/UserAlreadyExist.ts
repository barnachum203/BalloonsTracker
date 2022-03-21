import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";
export class UserAlreadyExist extends BaseError {
    constructor(message, statusCode = HttpStatusCode.UNAUTHORIZED) {
      super(message, statusCode);
      this.name = 'UserAlreadyExist';
    }
  }