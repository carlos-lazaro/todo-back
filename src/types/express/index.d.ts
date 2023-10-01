import { UserJsonwebtokenDto } from "../../dtos";

declare global {
  namespace Express {
    interface Request {
      user?: UserJsonwebtokenDto;
    }
  }
}

declare module "qs" {
  interface ParsedQs {
    page?: number | undefined;
    limit?: number | undefined;
  }
}
export {};
