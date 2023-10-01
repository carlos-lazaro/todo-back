import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  console.log(error.name);
  console.log((error as Error).message);

  let statusCode = 500;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = { message: "Internal Server Error", details: [] as any };

  error.status && (statusCode = error.status);
  error.message && (data.message = error.message);
  error.details && (data.details = error.details);

  res.status(statusCode).json({ ...data });
};

export { errorMiddleware };
