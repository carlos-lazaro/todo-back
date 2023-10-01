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
    page?: string;
    limit?: string;
  }
}
export {};
