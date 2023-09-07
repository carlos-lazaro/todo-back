import { NextFunction, Request, Response } from "express";

import { PaginationDto } from "../../dtos";
import { todoService } from "../todo-service";

export async function todoGetCountByTitle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("todoGetByUser");
  const paginationDto = new PaginationDto(req.query as any);
  const id = req.params.id;

  const todos = await todoService.getGroupByTitle(id, paginationDto);

  res.status(200).send({ todos });
}
