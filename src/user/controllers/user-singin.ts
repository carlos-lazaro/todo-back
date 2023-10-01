import { NextFunction, Request, Response } from "express";

import { UserSinginDto } from "../../dtos";
import { userService } from "../user-service";

export async function userSignin(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const userSinginDto = new UserSinginDto(req.body);

  const response = await userService.singin(userSinginDto);

  res.status(200).send({ data: response });
}
