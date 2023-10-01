import { NextFunction, Request, Response } from "express";

import { getUserOrThrowError } from "../../helper";
import { categoryService } from "../category-service";

export async function categoryGetAllByUser(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const user = getUserOrThrowError(req);

  const categories = await categoryService.getAll({ userId: user.id });

  res.status(200).send({ categories });
}
