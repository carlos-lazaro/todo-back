import { hash } from "bcrypt";

const generatePasswordHash = async (password: string, salt = 10) => {
  return await hash(password, salt);
};

export { generatePasswordHash };
