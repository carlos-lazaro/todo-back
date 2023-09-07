import cors from "cors";
import express from "express";

import { categoryRouter } from "./category";
import { healthRouter } from "./health";
import { errorMiddleware } from "./middlewares";
import { todoRouter } from "./todo";
import { userRouter } from "./user";

async function boostrap() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/health", healthRouter);
  app.use("/api/v1", userRouter);
  app.use("/api/v1", todoRouter);
  app.use("/api/v1", categoryRouter);

  app.use(errorMiddleware);

  const port = process.env.PORT ?? 3000;

  app.listen(port, () => {
    console.log(`[APP] - Started application on port ${port}`);
  });
}

export { boostrap };
