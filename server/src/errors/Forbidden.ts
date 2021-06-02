import { GeneralError } from "./GeneralError";
export class Forbidden extends GeneralError {
  constructor(message = "Not Authenticated") {
    super(message, 403);
  }
}
