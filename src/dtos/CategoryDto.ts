import Joi from "joi";

export class CategoryDto {
  title: string | undefined;
  description?: string | undefined;

  constructor(dependencies: { title: string; description: string }) {
    dependencies.title && (this.title = dependencies.title);
    dependencies.description && (this.description = dependencies.description);
  }

  public static Schema() {
    return Joi.object({
      title: Joi.string().trim().required(),
      description: Joi.string().allow("").optional(),
    });
  }
}
