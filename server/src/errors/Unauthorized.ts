import { GeneralError } from "./GeneralError";
export class Unathorized extends GeneralError {
  constructor(message = "Not Authorized") {
    super(message, 401);
  }
}
