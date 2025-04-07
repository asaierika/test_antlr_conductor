export class TypeCheckerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TypeError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TypeCheckerError);
    }
  }
}
