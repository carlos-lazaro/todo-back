import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

import { HttpError } from "../error";
import { UserJsonwebtokenDto } from "./../dtos";

export function checkJsonwebtokenMiddleware(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: Response,
  next: NextFunction,
) {
  const authorization = req.header("authorization");

  if (!authorization) {
    throw new HttpError("Unauthorized", 401, []);
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    throw new HttpError("Unauthorized", 401, []);
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET ?? "NO_SAFE",
    ) as JwtPayload;

    req.user = new UserJsonwebtokenDto(decoded.payload);

    next();
  } catch (error) {
    throw new HttpError("Invalid token.", 403, []);
  }
}
