import { NextFunction, Request, Response } from "express";

import { CategoryDto } from "../../dtos";
import { getUserOrThrowError } from "../../helper";
import { categoryService } from "../category-service";

export async function categoryUpdate(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const user = getUserOrThrowError(req);

  const categoryDto = new CategoryDto(req.body);
  categoryDto.userId = user.id;

  const id = req.params.id;

  const category = await categoryService.update(
    { _id: id, userId: user.id },
    categoryDto,
  );

  res.status(200).send({ category });
}
