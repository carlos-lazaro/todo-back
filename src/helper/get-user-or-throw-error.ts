import { Request } from "express";

import { HttpError } from "../error";

const getUserOrThrowError = (req: Request) => {
  const user = req.user;

  if (!user) {
    throw new HttpError("Unauthorized", 403, []);
  }

  return user;
};

export { getUserOrThrowError };
