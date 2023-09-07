import { PaginationDto, TimeIntevalDto, TodoDto } from "../dtos";
import { TodoModel, TodoModelType } from "../entities";
import { normalizerString } from "../helper";

class TodoService {
  model: TodoModelType;

  constructor(model: TodoModelType) {
    this.model = model;
  }

  async getById(id: string) {
    console.log("getById", id);
    const todo = await this.model
      .findOne({ _id: id })
      .populate("categories")
      .exec();

    return todo;
  }

  async getByUser(id: string, paginationDto: PaginationDto) {
    console.log("getByUser", id);
    console.log("getByUser", paginationDto);
    const todos = await this.model
      .find({ user: id })
      .populate("categories")
      .skip((paginationDto.page - 1) * paginationDto.limit)
      .limit(paginationDto.limit)
      .exec();

    return todos;
  }

  async getByUserCategory(
    idUser: string,
    idCategory: string,
    paginationDto: PaginationDto,
  ) {
    console.log("getByCategory", paginationDto);
    const todos = await this.model
      .find({ user: idUser, categories: { $in: idCategory } })
      .populate("categories")
      .skip((paginationDto.page - 1) * paginationDto.limit)
      .limit(paginationDto.limit)
      .exec();

    return todos;
  }

  async getGroupByTitle(id: string, paginationDto: PaginationDto) {
    console.log("getCountByTitle", paginationDto);
    const todos = await this.model
      .aggregate([
        {
          $match: {
            user: id,
          },
        },
        {
          $group: {
            _id: "$title",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ])
      .skip((paginationDto.page - 1) * paginationDto.limit)
      .limit(paginationDto.limit)
      .exec();

    return todos;
  }

  async getInTimeInterval(timeIntevalDto: TimeIntevalDto, id: string) {
    console.log("getInTimeInterval", timeIntevalDto);
    const todos = await this.model
      .aggregate([
        {
          $match: {
            user: id,
            // createdAt: {
            //   $gte: new Date(timeIntevalDto.startDate),
            //   $lte: new Date(timeIntevalDto.endDate),
            // },
          },
        },
        {
          $project: {
            words: {
              $split: ["$title", " "],
            },
          },
        },
        {
          $unwind: "$words",
        },
        {
          $group: {
            _id: "$words",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 10,
        },
      ])
      .exec();

    return todos;
  }

  async create(todoDto: TodoDto) {
    console.log("TodoService.create", todoDto);

    todoDto.words = normalizerString(todoDto.title).split(" ");

    const todo = await this.model.create(todoDto);

    return todo;
  }

  async update(id: string, todoDto: TodoDto) {
    todoDto.words = normalizerString(todoDto.title).split(" ");

    const todo = await this.model.findOneAndUpdate({ _id: id }, todoDto);

    return todo;
  }

  async delete(id: string) {
    const { deletedCount } = await this.model.deleteOne({ _id: id });

    return deletedCount;
  }
}

const todoService = new TodoService(TodoModel);

export { todoService };
