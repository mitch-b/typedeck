export class InvalidArgumentError extends Error {
  constructor (message: string) {
    super(`Invalid Argument: ${message}`)
  }
}
