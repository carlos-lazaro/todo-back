import Joi from "joi";

export class UserSinginDto {
  password: string | undefined;
  email: string | undefined;

  constructor(dependencies: { password: string; email: string }) {
    dependencies.password && (this.password = dependencies.password);
    dependencies.email && (this.email = dependencies.email);
  }

  public static Schema() {
    return Joi.object({
      password: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
    });
  }
}
