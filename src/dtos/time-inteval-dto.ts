import Joi from "joi";

export class TimeIntevalDto {
  readonly startDate;
  readonly endDate;

  constructor(dependencies: { startDate: string; endDate: string }) {
    console.log("dependencies", dependencies);
    this.startDate = dependencies.startDate;
    this.endDate = dependencies.endDate;
  }

  public static Schema() {
    return Joi.object({
      startDate: Joi.string().trim().optional(),
      endDate: Joi.string().trim().optional(),
    });
  }
}
