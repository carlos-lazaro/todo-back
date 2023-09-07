import { NextFunction, Request, Response } from "express";

import { UserLoginDto } from "../../dtos";
import { userService } from "../user-service";

export async function userSignin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userLoginDto = new UserLoginDto(req.body);

  const user = await userService.singin(userLoginDto);

  res.status(200).send({ user: user });
}
