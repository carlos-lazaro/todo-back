import express from "express";

import { UserSinginDto, UserSingupDto } from "../dtos";
import { partialSchema } from "../helper";
import { catchAsyncErrors, schemaValidation } from "../middlewares";
import { userSignin, userSignup } from "./controllers";

const userRouter = express.Router();

userRouter.post(
  "/users/singin",
  schemaValidation({
    body: partialSchema(UserSinginDto.Schema()),
  }),
  catchAsyncErrors(userSignin),
);

userRouter.post(
  "/users/singup",
  schemaValidation({
    body: partialSchema(UserSingupDto.Schema()),
  }),
  catchAsyncErrors(userSignup),
);

export { userRouter };
