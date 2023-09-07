import { NextFunction, Request, Response } from "express";

import { UserDto } from "../../dtos";
import { userService } from "../user-service";

export async function userUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userDto = new UserDto(req.body);
  const id = req.params.id;

  const user = await userService.update(id, userDto);

  res.status(200).send({ user });
}
