export class Exception extends Error {
  constructor(
    public message: string,
    public status: number = 500,
  ) {
    super(message);
    this.name = 'Exception';
  }
}
