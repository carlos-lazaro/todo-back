import { sign } from "jsonwebtoken";

import { UserJsonwebtokenPayloadDto } from "../dtos";

const generateJsonwebtoken = (data: UserJsonwebtokenPayloadDto): string => {
  return sign({ payload: data }, process.env.JWT_SECRET ?? "NO_SAFE", {
    expiresIn: process.env.JWT_DURATION ?? "1h",
  });
};

export { generateJsonwebtoken };
