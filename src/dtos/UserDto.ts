import Joi from "joi";

export class UserDto {
  name: string | undefined;
  password: string | undefined;
  email: string | undefined;

  constructor(dependencies: { name: string; password: string; email: string }) {
    dependencies.name && (this.name = dependencies.name);
    dependencies.password && (this.password = dependencies.password);
    dependencies.email && (this.email = dependencies.email);
  }

  public static Schema() {
    return Joi.object({
      name: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
    });
  }
}

export class UserLoginDto {
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
