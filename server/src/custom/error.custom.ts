export default class CustomError extends Error {
  status: number;

  constructor({
    message = 'An error occurred',
    status = 400,
  }: { message?: string; status?: number } = {}) {
    super(message);
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
