import { NextFunction, Request, Response } from "express";

import { todoService } from "../todo-service";

export async function todoDelete(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("todoDelete");
  const id = req.params.id;

  const deletedCount = await todoService.delete(id);

  res.status(200).send({ deletedCount });
}
