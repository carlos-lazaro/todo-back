import { NextFunction, Request, Response } from "express";

import { PaginationDto } from "../../dtos";
import { categoryService } from "../category-service";

export async function categoryGetAll(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const paginationDto = new PaginationDto(req.query as any);
  const id = req.params.id;

  const categories = await categoryService.getAll(id, paginationDto);

  res.status(200).send({ categories });
}
