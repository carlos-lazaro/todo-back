import { NextFunction, Request, Response } from "express";

import { HttpError } from "../error";

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error.name);
  console.log((error as Error).message);
  let statusCode = 500;
  const data = { message: "Internal Server Error", details: [] as any };

  if (error instanceof HttpError) {
    const he = error as HttpError;
    statusCode = he.status;
    data.message = he.message;
    he.details && (data.details = he.details);
  } else {
    error.status && (statusCode = error.status);
    error.message && (data.message = error.message);
  }

  res.status(statusCode).json({ ...data });
};

export { errorMiddleware };
