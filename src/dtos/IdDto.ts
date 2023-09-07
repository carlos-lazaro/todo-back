import Joi from "joi";

export class IdDto {
  public static Schema() {
    return Joi.object({
      id: Joi.string().trim().required(),
    });
  }
}

export class IdUserCategoryDto {
  public static Schema() {
    return Joi.object({
      iduser: Joi.string().trim().required(),
      idcategory: Joi.string().trim().required(),
    });
  }
}
