import express from "express";

import { IdDto, PaginationDto, TimeIntevalDto, TodoDto } from "../dtos";
import { partialSchema } from "../helper";
import {
  catchAsyncErrors,
  checkJsonwebtokenMiddleware,
  schemaValidation,
} from "../middlewares";
import {
  todoCreate,
  todoDelete,
  todoGetById,
  todoGetByUser,
  todoGetByUserCategory,
  todoGetCountByTitle,
  todoUpdate,
} from "./controllers";

const todoRouter = express.Router();

todoRouter.get(
  "/todos/user",
  checkJsonwebtokenMiddleware,
  schemaValidation({ query: PaginationDto.Schema() }),
  catchAsyncErrors(todoGetByUser),
);

todoRouter.get(
  "/todos/user/words",
  checkJsonwebtokenMiddleware,
  schemaValidation({
    query: TimeIntevalDto.Schema(),
  }),
  catchAsyncErrors(todoGetCountByTitle),
);

todoRouter.get(
  "/todos/category/:idcategory",
  checkJsonwebtokenMiddleware,
  schemaValidation({
    query: PaginationDto.Schema(),
    params: IdDto.Schema("idcategory"),
  }),
  catchAsyncErrors(todoGetByUserCategory),
);

todoRouter.get(
  "/todos/:id",
  checkJsonwebtokenMiddleware,
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(todoGetById),
);

todoRouter.post(
  "/todos",
  checkJsonwebtokenMiddleware,
  schemaValidation({
    body: partialSchema(TodoDto.Schema()).options({ allowUnknown: true }),
  }),
  catchAsyncErrors(todoCreate),
);

todoRouter.patch(
  "/todos/:id",
  checkJsonwebtokenMiddleware,
  schemaValidation({
    body: partialSchema(TodoDto.Schema()).options({ allowUnknown: true }),
    params: IdDto.Schema(),
  }),
  catchAsyncErrors(todoUpdate),
);

todoRouter.delete(
  "/todos/:id",
  checkJsonwebtokenMiddleware,
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(todoDelete),
);

export { todoRouter };
