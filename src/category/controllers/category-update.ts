import { NextFunction, Request, Response } from "express";

import { CategoryDto } from "../../dtos";
import { categoryService } from "../category-service";

export async function categoryUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const categoryDto = new CategoryDto(req.body);
  const id = req.params.id;

  const category = await categoryService.update(id, categoryDto);

  res.status(200).send({ category });
}
