import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";
export class BalloonAlreadyExist extends BaseError {
    constructor(message, statusCode = HttpStatusCode.UNAUTHORIZED) {
      super(message, statusCode);
      this.name = 'BalloonAlreadyExist';
    }
  }