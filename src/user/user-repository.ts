import { Model } from "mongoose";

import { User, UserModel } from "../entities";
import { Repository } from "../repository";

class UserRepository extends Repository<User> {
  constructor(model: Model<User>) {
    super(model);
  }
}

const userRepository = new UserRepository(UserModel);

export { UserRepository, userRepository };
