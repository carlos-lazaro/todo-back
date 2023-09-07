import { NextFunction, Request, Response } from "express";

import { categoryService } from "../category-service";

export async function categoryGetById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id;

  const category = await categoryService.getById(id);

  console.log("categoryGetById", category);
  res.status(200).send({ category });
}
