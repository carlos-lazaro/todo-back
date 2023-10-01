import express from "express";

import { CategoryDto, IdDto } from "../dtos";
import { partialSchema } from "../helper";
import {
  catchAsyncErrors,
  checkJsonwebtokenMiddleware,
  schemaValidation,
} from "../middlewares";
import {
  categoryCreate,
  categoryDelete,
  categoryGetAllByUser,
  categoryGetById,
  categoryUpdate,
} from "./controllers";

const categoryRouter = express.Router();

categoryRouter.get(
  "/categories/user",
  checkJsonwebtokenMiddleware,
  catchAsyncErrors(categoryGetAllByUser),
);

categoryRouter.get(
  "/categories/:id",
  checkJsonwebtokenMiddleware,
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(categoryGetById),
);

categoryRouter.post(
  "/categories",
  checkJsonwebtokenMiddleware,
  schemaValidation({
    body: partialSchema(CategoryDto.Schema()).options({ allowUnknown: true }),
  }),
  catchAsyncErrors(categoryCreate),
);

categoryRouter.patch(
  "/categories/:id",
  checkJsonwebtokenMiddleware,
  schemaValidation({
    body: partialSchema(CategoryDto.Schema()).options({ allowUnknown: true }),
    params: IdDto.Schema(),
  }),
  catchAsyncErrors(categoryUpdate),
);

categoryRouter.delete(
  "/categories/:id",
  checkJsonwebtokenMiddleware,
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(categoryDelete),
);

export { categoryRouter };
