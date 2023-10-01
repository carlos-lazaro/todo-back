import { NextFunction, Request, Response } from "express";

import { getUserOrThrowError } from "../../helper";
import { todoService } from "../todo-service";

export async function todoGetById(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  console.log("todoGetById");
  const user = getUserOrThrowError(req);

  const id = req.params.id;

  const todo = await todoService.getOne({ _id: id, userId: user.id });

  res.status(200).send({ todo });
}
