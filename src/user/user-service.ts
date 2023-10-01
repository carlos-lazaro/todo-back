import { UserJsonwebtokenPayload, UserSinginDto, UserSingupDto } from "../dtos";
import {
  comparatePasswordHash,
  generateJsonwebtoken,
  generatePasswordHash,
} from "../helper";
import { UserRepository, userRepository } from "./user-repository";

class UserService {
  userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  async singin(userLoginDto: UserSinginDto) {
    const user = await this.userRepository.getOne({
      email: userLoginDto.email,
    });

    if (!user) {
      return null;
    }

    const isValid = await comparatePasswordHash(
      userLoginDto?.password ?? "",
      user?.password ?? "-1",
    );

    if (!isValid) {
      return null;
    }

    const userJWT = new UserJsonwebtokenPayload(user);

    const token = generateJsonwebtoken(userJWT);

    return { user: userJWT, token };
  }

  async singup(userSingupDto: UserSingupDto) {
    if (!userSingupDto || !userSingupDto?.password) return null;

    userSingupDto.password = await generatePasswordHash(
      userSingupDto?.password,
    );

    const user = await this.userRepository.create(userSingupDto);

    if (!user) {
      return null;
    }

    const userJWT = new UserJsonwebtokenPayload(user);

    const token = generateJsonwebtoken(userJWT);

    return { user: userJWT, token };
  }
}

const userService = new UserService(userRepository);

export { userService };
