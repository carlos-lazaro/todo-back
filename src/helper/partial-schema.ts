import { ObjectSchema } from "joi";

const partialSchema = (schema: ObjectSchema) => {
  return schema.fork(Object.keys(schema.describe().keys), schema =>
    schema.optional(),
  );
};

export { partialSchema };
