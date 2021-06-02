import { GeneralError } from "./GeneralError";

export class NotFound extends GeneralError {
  constructor(message: string, id: string | number) {
    super(`${message} not found with id ${id}`, 404);
  }
}
