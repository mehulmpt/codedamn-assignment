import { GeneralError } from "./GeneralError";

export class BadRequest extends GeneralError {
  constructor(message: string) {
    super(message, 400);
  }
}
