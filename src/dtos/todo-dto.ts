import Joi from "joi";

export class TodoDto {
  userId: string | undefined;
  title: string | undefined;
  description: string | undefined;
  status: number | undefined;
  words: string[] | undefined;
  categories: string[] | undefined;

  constructor(dependencies: {
    userId: string;
    title: string;
    description: string;
    status: string;
    words: string[];
    categories: string[];
  }) {
    dependencies.userId && (this.userId = dependencies.userId);
    dependencies.title && (this.title = dependencies.title);
    dependencies.description && (this.description = dependencies.description);
    dependencies.status && (this.status = Number(dependencies.status));
    dependencies.words && (this.words = dependencies.words);
    dependencies.categories && (this.categories = dependencies.categories);
  }

  public static Schema() {
    return Joi.object({
      userId: Joi.string().trim().allow("").optional(),
      title: Joi.string().trim().required(),
      description: Joi.string().allow("").optional(),
      status: Joi.number().positive().optional(),
    });
  }
}
