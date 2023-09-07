import { Request, Response } from "express";

export class HealthController {
  async run(req: Request, res: Response) {
    res.status(201).send();
  }
}
