import { NextFunction, Request, Response } from "express";

import { UserSingupDto } from "../../dtos";
import { userService } from "../user-service";

export async function userSignup(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const userSingupDto = new UserSingupDto(req.body);

  const response = await userService.singup(userSingupDto);

  res.status(201).send({ data: response });
}
