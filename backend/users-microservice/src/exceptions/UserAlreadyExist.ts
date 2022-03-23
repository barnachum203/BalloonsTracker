import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";
export class UserAlreadyExist extends BaseError {
    constructor(message, statusCode = HttpStatusCode.CONFLICT) {
      super(message, statusCode);
      this.name = 'UserAlreadyExist';
    }
  }