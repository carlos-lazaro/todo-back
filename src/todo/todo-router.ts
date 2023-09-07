import express from "express";

import { IdDto, IdUserCategoryDto, PaginationDto, TodoDto } from "../dtos";
import { TimeIntevalDto } from "../dtos/TimeIntevalDto";
import { partialSchema } from "../helper";
import { catchAsyncErrors, schemaValidation } from "../middlewares";
import {
  todoCreate,
  todoDelete,
  todoGetById,
  todoGetByUser,
  todoGetByUserCategory,
  todoGetCountByTitle,
  todoGetInIntervalTime,
  todoUpdate,
} from "./controllers";

const todoRouter = express.Router();

todoRouter.get(
  "/todos/:id",
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(todoGetById),
);

todoRouter.get(
  "/todos/users/:id",
  schemaValidation({ query: PaginationDto.Schema(), params: IdDto.Schema() }),
  catchAsyncErrors(todoGetByUser),
);

todoRouter.get(
  "/todos/users/:iduser/categories/:idcategory",
  schemaValidation({
    query: PaginationDto.Schema(),
    params: IdUserCategoryDto.Schema(),
  }),
  catchAsyncErrors(todoGetByUserCategory),
);

todoRouter.get(
  "/todos/users/:id/group/title",
  schemaValidation({
    query: PaginationDto.Schema(),
    params: IdDto.Schema(),
  }),
  catchAsyncErrors(todoGetCountByTitle),
);

todoRouter.get(
  "/todos/users/:id/words/interval",
  schemaValidation({
    query: TimeIntevalDto.Schema(),
    params: IdDto.Schema(),
  }),
  catchAsyncErrors(todoGetInIntervalTime),
);

todoRouter.post(
  "/todos",
  schemaValidation({
    body: partialSchema(TodoDto.Schema()).options({ allowUnknown: true }),
  }),
  catchAsyncErrors(todoCreate),
);

todoRouter.patch(
  "/todos/:id",
  schemaValidation({
    body: partialSchema(TodoDto.Schema()).options({ allowUnknown: true }),
    params: IdDto.Schema(),
  }),
  catchAsyncErrors(todoUpdate),
);

todoRouter.delete(
  "/todos/:id",
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(todoDelete),
);

export { todoRouter };
