import { NextFunction, Request, Response } from "express";

import { todoService } from "../todo-service";

export async function todoGetById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("todoGetById");
  const id = req.params.id;

  const todo = await todoService.getById(id);

  console.log("todoGetById", todo);
  res.status(200).send({ todo });
}
