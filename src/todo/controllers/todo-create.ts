import { NextFunction, Request, Response } from "express";

import { TodoDto } from "../../dtos";
import { userService } from "../../user";
import { todoService } from "../todo-service";

export async function todoCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("todoCreate");
  const todoDto = new TodoDto(req.body);

  const todo = await todoService.create(todoDto);

  await userService.updateCommonTodos(todo);

  res.status(200).send({ todo });
}
