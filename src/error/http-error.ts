/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpError extends Error {
  status: number;
  details: any[];
  constructor(message: string, status: number, details: any[]) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
