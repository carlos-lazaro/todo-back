import express from "express";

import { IdDto, UserDto, UserLoginDto } from "../dtos";
import { partialSchema } from "../helper";
import { catchAsyncErrors, schemaValidation } from "../middlewares";
import {
  userCreate,
  userDelete,
  userGetById,
  userSignin,
  userUpdate,
} from "./controllers";

const userRouter = express.Router();

userRouter.post(
  "/users/singin",
  schemaValidation({
    body: partialSchema(UserLoginDto.Schema()),
  }),
  catchAsyncErrors(userSignin),
);

userRouter.get(
  "/users/:id",
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(userGetById),
);

userRouter.post(
  "/users",
  schemaValidation({
    body: partialSchema(UserDto.Schema()),
  }),
  catchAsyncErrors(userCreate),
);

userRouter.patch(
  "/users/:id",
  schemaValidation({
    body: partialSchema(UserDto.Schema()).options({ allowUnknown: true }),
    params: IdDto.Schema(),
  }),
  catchAsyncErrors(userUpdate),
);

userRouter.delete(
  "/users/:id",
  schemaValidation({ params: IdDto.Schema() }),
  catchAsyncErrors(userDelete),
);

export { userRouter };
