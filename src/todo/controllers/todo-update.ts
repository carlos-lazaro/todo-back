import { NextFunction, Request, Response } from "express";

import { TodoDto } from "../../dtos";
import { getUserOrThrowError } from "../../helper";
import { todoService } from "../todo-service";

export async function todoUpdate(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const user = getUserOrThrowError(req);

  const todoDto = new TodoDto(req.body);
  todoDto.userId = user.id;

  const id = req.params.id;

  const todo = await todoService.update({ _id: id, userId: user.id }, todoDto);

  res.status(200).send({ todo });
}
