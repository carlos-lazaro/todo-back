import { NextFunction, Request, Response } from "express";

export function catchAsyncErrors(
  func: (req: Request, res: Response, next: NextFunction) => void,
) {
  console.log("catchAsyncErrors");
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(e => {
      next(e);
    });
}
