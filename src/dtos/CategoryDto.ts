import Joi from "joi";

export class CategoryDto {
  userId: string | undefined;
  title: string | undefined;
  description?: string | undefined;

  constructor(dependencies: {
    userId: string;
    title: string;
    description: string;
  }) {
    dependencies.userId && (this.userId = dependencies.userId);
    dependencies.title && (this.title = dependencies.title);
    dependencies.description && (this.description = dependencies.description);
  }

  public static Schema() {
    return Joi.object({
      userId: Joi.string().trim().allow("").optional(),
      title: Joi.string().trim().required(),
      description: Joi.string().trim().allow("").optional(),
    });
  }
}
