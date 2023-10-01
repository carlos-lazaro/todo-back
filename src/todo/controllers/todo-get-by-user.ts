import { NextFunction, Request, Response } from "express";

import { PaginationDto } from "../../dtos";
import { getUserOrThrowError } from "../../helper";
import { todoService } from "../todo-service";

export async function todoGetByUser(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  console.log("todoGetByUser");
  const user = getUserOrThrowError(req);

  const paginationDto = new PaginationDto(req.query);

  const todos = await todoService.getPage(
    {
      userId: user.id,
    },
    paginationDto,
  );

  res.status(200).send({ todos: todos });
}
