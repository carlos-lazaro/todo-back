import { NextFunction, Request, Response } from "express";

import { CategoryDto } from "../../dtos";
import { categoryService } from "../category-service";

export async function categoryCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const categoryDto = new CategoryDto(req.body);

  const category = await categoryService.create(categoryDto);

  res.status(200).send({ category });
}
