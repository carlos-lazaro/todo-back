import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

import { PaginationDto } from "../../dtos";
import { getUserOrThrowError } from "../../helper";
import { todoService } from "../todo-service";

export async function todoGetByUserCategory(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  console.log("todoGetByUserCategory");
  const user = getUserOrThrowError(req);

  const paginationDto = new PaginationDto(req.query);

  const idCategory = req.params.idcategory;

  const todos = await todoService.getPage(
    {
      userId: user.id,
      categories: { $in: [new ObjectId(idCategory)] },
    },
    paginationDto,
  );

  res.status(200).send({ todos: todos });
}
