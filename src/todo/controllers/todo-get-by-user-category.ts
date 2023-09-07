import { NextFunction, Request, Response } from "express";

import { PaginationDto } from "../../dtos";
import { todoService } from "../todo-service";

export async function todoGetByUserCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("todoGetByCategory");
  const paginationDto = new PaginationDto(req.query as any);
  const idUser = req.params.iduser;
  const idCategory = req.params.idcategory;

  const todos = await todoService.getByUserCategory(
    idUser,
    idCategory,
    paginationDto,
  );

  res.status(200).send({ todos });
}
