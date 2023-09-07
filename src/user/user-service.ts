import { UserDto, UserLoginDto } from "../dtos";
import { Todo, UserModel, UserModelType } from "../entities";
import { comparatePasswordHash, generatePasswordHash } from "../helper";

class UserService {
  model: UserModelType;

  constructor(model: UserModelType) {
    this.model = model;
  }

  async singin(userLoginDto: UserLoginDto) {
    const user = await this.model.findOne({ email: userLoginDto.email });
    const isValid = await comparatePasswordHash(
      userLoginDto?.password || "",
      user?.password || "-1",
    );

    return isValid ? user : null;
  }

  async getById(id: string) {
    const user = await this.model.findOne({ _id: id });

    return user;
  }

  async create(userDto: UserDto) {
    if (!userDto?.password) return null;
    userDto.password = await generatePasswordHash(userDto?.password);

    const user = await this.model.create(userDto);
    return user;
  }

  async update(id: string, userDto: UserDto) {
    const user = await this.model.findOneAndUpdate({ _id: id }, userDto);

    return user;
  }

  async delete(id: string) {
    const { deletedCount } = await this.model.deleteOne({ _id: id });

    return deletedCount;
  }

  async updateCommonTodos(todo: Todo) {
    const user = await this.getById(todo.user);

    let commonTodo = user?.commonTodos.find(
      commonTodo => commonTodo.title === todo.title,
    );

    if (!commonTodo) {
      commonTodo = { title: todo.title, quantity: 0 };
    }

    commonTodo.quantity++;

    return true;
  }
}

const userService = new UserService(UserModel);

export { userService };
