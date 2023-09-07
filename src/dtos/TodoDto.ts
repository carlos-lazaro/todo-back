import Joi from "joi";

export class TodoDto {
  user: string | undefined;
  title: string | undefined;
  description: string | undefined;
  status: number | undefined;
  words: string[] | undefined;
  categories: string[] | undefined;

  constructor(dependencies: {
    user: string;
    title: string;
    description: string;
    status: string;
    words: string[];
    categories: string[];
  }) {
    dependencies.user && (this.user = dependencies.user);
    dependencies.title && (this.title = dependencies.title);
    dependencies.description && (this.description = dependencies.description);
    dependencies.status && (this.status = Number(dependencies.status));
    dependencies.words && (this.words = dependencies.words);
    dependencies.categories && (this.categories = dependencies.categories);
  }

  public static Schema() {
    return Joi.object({
      user: Joi.string().trim().required(),
      title: Joi.string().trim().required(),
      description: Joi.string().allow("").optional(),
      status: Joi.number().positive().optional(),
    });
  }
}
