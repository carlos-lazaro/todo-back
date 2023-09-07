import { NextFunction, Request, Response } from "express";

import { TimeIntevalDto } from "../../dtos";
import { todoService } from "../todo-service";

export async function todoGetInIntervalTime(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("todoGetByUser");
  const timeIntevalDto = new TimeIntevalDto(req.query as any);
  const id = req.params.id;

  const words = await todoService.getInTimeInterval(timeIntevalDto, id);

  res.status(200).send({ words });
}
