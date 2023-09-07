import express from "express";

import { CategoryDto, IdDto, PaginationDto } from "../dtos";
import { partialSchema } from "../helper";
import { catchAsyncErrors, schemaValidation } from "../middlewares";
import {
  categoryCreate,
  categoryDelete,
  categoryGetAll,
  categoryGetById,
  categoryUpdate,
} from "./controllers";

const categoryRouter = express.Router();

categoryRouter.get(
  "/categories",
  schemaValidation({ query: PaginationDto.Schema() }),
  catchAsyncErrors(categoryGetAll),
);

categoryRouter.get(
  "/categories/:id",
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(categoryGetById),
);

categoryRouter.post(
  "/categories",
  schemaValidation({
    body: partialSchema(CategoryDto.Schema()).options({ allowUnknown: true }),
  }),
  catchAsyncErrors(categoryCreate),
);

categoryRouter.patch(
  "/categories/:id",
  schemaValidation({
    body: partialSchema(CategoryDto.Schema()).options({ allowUnknown: true }),
    params: IdDto.Schema(),
  }),
  catchAsyncErrors(categoryUpdate),
);

categoryRouter.delete(
  "/categories/:id",
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(categoryDelete),
);

export { categoryRouter };
