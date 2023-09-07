import { NextFunction, Request, Response } from "express";

import { UserDto } from "../../dtos";
import { userService } from "../user-service";

export async function userCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userDto = new UserDto(req.body);

  const user = await userService.create(userDto);

  res.status(200).send({ user });
}
