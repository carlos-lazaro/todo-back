import { NextFunction, Request, Response } from "express";

import { categoryService } from "../category-service";

export async function categoryDelete(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id;

  const deletedCount = await categoryService.delete(id);

  res.status(200).send({ deletedCount });
}
