import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { HttpError } from "../error";

enum RequestValues {
  Body = "body",
  Query = "query",
  Headers = "headers",
  Params = "params",
}

interface SchemasConfig {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  headers?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

const schemaValidation = (schemas: SchemasConfig | null) => {
  return function schemaValidation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.log("schemaValidation");
    if (schemas != null) {
      const errors: string[] = [];

      Object.entries(schemas).forEach(([requestPart, schema]) => {
        if (schema != null) {
          const { error } = schema.validate(req[requestPart as RequestValues], {
            abortEarly: false,
          });

          if (error != null) {
            errors.push({ ...error, type: requestPart });
          }
        }
      });

      if (errors.length > 0) throw new HttpError(`Bad Request`, 404, errors);
    }
    next();
  };
};

export { schemaValidation };
