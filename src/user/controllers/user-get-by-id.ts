import { NextFunction, Request, Response } from "express";

import { userService } from "../user-service";

export async function userGetById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id;

  const user = await userService.getById(id);

  console.log("userGetById", user);
  res.status(200).send({ user });
}
