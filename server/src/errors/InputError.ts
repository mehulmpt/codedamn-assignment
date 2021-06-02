export class InputError extends Error {
  error: Record<string, string> = {};
  statusCode = 500;

  constructor(error: Record<string, string>) {
    super();
    this.error = error;
    this.message = "Validation Error";
    this.statusCode = 400;
  }
}
