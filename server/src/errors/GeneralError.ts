export class GeneralError extends Error {
  statusCode = 500;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }

  getCode() {
    return this.statusCode;
  }
}
