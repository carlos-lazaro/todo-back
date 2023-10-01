import { compare } from "bcrypt";

const comparePasswordHash = async (password: string, passwordHash: string) => {
  return await compare(password, passwordHash);
};

export { comparePasswordHash as comparatePasswordHash };
