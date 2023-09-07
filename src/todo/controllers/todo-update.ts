import { NextFunction, Request, Response } from "express";

import { TodoDto } from "../../dtos";
import { todoService } from "../todo-service";

export async function todoUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("todoUpdate");
  const todoDto = new TodoDto(req.body);
  const id = req.params.id;
  console.log("todoUpdate", id);

  const todo = await todoService.update(id, todoDto);

  res.status(200).send({ todo });
}
