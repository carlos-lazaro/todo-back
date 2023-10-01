import { NextFunction, Request, Response } from "express";

import { getUserOrThrowError } from "../../helper";
import { categoryService } from "../category-service";

export async function categoryDelete(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const user = getUserOrThrowError(req);

  const id = req.params.id;

  const deletedCount = await categoryService.delete({
    _id: id,
    userId: user.id,
  });

  res.status(200).send({ deletedCount });
}
