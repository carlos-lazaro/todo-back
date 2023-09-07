import { NextFunction, Request, Response } from "express";

import { userService } from "../user-service";

export async function userDelete(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id;

  const deletedCount = await userService.delete(id);

  res.status(200).send({ deletedCount });
}
